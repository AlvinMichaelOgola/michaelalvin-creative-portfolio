import {
  getSupabaseClient,
  getSupabaseStorageBucket,
} from "@/lib/supabase-client";

type ResponsiveImageFormat = "avif" | "webp" | "jpeg";

export type ResponsiveImageVariant = {
  format: ResponsiveImageFormat;
  width: number;
  url: string;
};

export type ResponsiveImageSet = {
  src: string;
  sizes: string;
  variants: ResponsiveImageVariant[];
};

const RESPONSIVE_IMAGE_WIDTHS = [480, 768, 1200, 1600] as const;
const RESPONSIVE_IMAGE_PRESETS: ReadonlyArray<{
  format: ResponsiveImageFormat;
  quality: number;
}> = [
  { format: "avif", quality: 52 },
  { format: "webp", quality: 65 },
  { format: "jpeg", quality: 75 },
];
const ENABLE_RESPONSIVE_IMAGE_VARIANTS =
  import.meta.env.VITE_RESPONSIVE_IMAGE_VARIANTS === "true";

export type HeroContent = {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  portraitUrl: string;
  portraitImage?: ResponsiveImageSet;
};

export type FooterContent = {
  heading: string;
  ctaText: string;
  copyright: string;
};

export type SiteSettingsContent = {
  brand: {
    siteName: string;
    tagline: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  social: {
    instagram: string;
    x: string;
    behance: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
  };
};

export type GalleryContentItem = {
  src: string;
  alt: string;
  category: string;
  order: number;
  image?: ResponsiveImageSet;
};

export type VideoContentItem = {
  id: string;
  title: string;
  youtubeId: string;
};

export type GearContentItem = {
  title: string;
  subtitle: string;
  desc: string;
  order: number;
};

export type PortfolioContent = {
  hero: HeroContent | null;
  footer: FooterContent | null;
  siteSettings: SiteSettingsContent;
  galleryCategories: string[];
  gallery: GalleryContentItem[];
  videos: VideoContentItem[];
  gear: GearContentItem[];
};

function mapHeroContent(data: {
  title: string | null;
  subtitle: string | null;
  description: string | null;
  cta_text: string | null;
  portrait_path: string | null;
}): Promise<HeroContent> {
  return resolveResponsiveImageSet(data.portrait_path, {
    fallbackWidth: 900,
    fallbackQuality: 82,
    sizes: "(min-width: 1024px) 30vw, 70vw",
    maxWidth: 1600,
  }).then((heroPortraitImage) => ({
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    description: data.description ?? "",
    ctaText: data.cta_text ?? "",
    portraitUrl: heroPortraitImage.src,
    portraitImage: heroPortraitImage,
  }));
}

function isAbsoluteAssetPath(path: string) {
  return /^(https?:\/\/|data:|blob:)/i.test(path);
}

function extractYoutubeId(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  const input = value.trim();
  if (!/^https?:\/\//i.test(input)) {
    return input;
  }

  try {
    const url = new URL(input);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.replace("/", "");
    }
    if (url.searchParams.get("v")) {
      return url.searchParams.get("v") || "";
    }
    const segments = url.pathname.split("/").filter(Boolean);
    const embedIndex = segments.findIndex((segment) => segment === "embed");
    if (embedIndex >= 0 && segments[embedIndex + 1]) {
      return segments[embedIndex + 1];
    }
  } catch {
    return input;
  }

  return input;
}

async function resolveStorageUrl(
  path: string | null | undefined,
  transform?: { width?: number; quality?: number; format?: ResponsiveImageFormat },
) {
  if (!path) {
    return "";
  }

  if (isAbsoluteAssetPath(path)) {
    return path;
  }

  const supabase = getSupabaseClient();
  const configuredBucket = getSupabaseStorageBucket();
  const candidateBuckets = Array.from(new Set([configuredBucket, "gallery"]));

  for (const bucket of candidateBuckets) {
    const transformed = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 60, {
      transform,
    });
    if (!transformed.error && transformed.data?.signedUrl) {
      return transformed.data.signedUrl;
    }

    const plain = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 60);
    if (!plain.error && plain.data?.signedUrl) {
      return plain.data.signedUrl;
    }
  }

  return "";
}

async function resolveResponsiveImageSet(
  path: string | null | undefined,
  options: {
    fallbackWidth: number;
    fallbackQuality: number;
    sizes: string;
    maxWidth?: number;
  },
): Promise<ResponsiveImageSet> {
  const src = await resolveStorageUrl(path, {
    width: options.fallbackWidth,
    quality: options.fallbackQuality,
  });

  if (!path || isAbsoluteAssetPath(path) || !ENABLE_RESPONSIVE_IMAGE_VARIANTS) {
    return { src, sizes: options.sizes, variants: [] };
  }

  const widths = RESPONSIVE_IMAGE_WIDTHS.filter(
    (width) => options.maxWidth == null || width <= options.maxWidth,
  );
  const variantResults = await Promise.all(
    widths.flatMap((width) =>
      RESPONSIVE_IMAGE_PRESETS.map(async (preset) => {
        const url = await resolveStorageUrl(path, {
          width,
          quality: preset.quality,
          format: preset.format,
        });
        if (!url) {
          return null;
        }
        return {
          format: preset.format,
          width,
          url,
        } satisfies ResponsiveImageVariant;
      }),
    ),
  );

  return {
    src,
    sizes: options.sizes,
    variants: variantResults.filter(
      (variant): variant is ResponsiveImageVariant => variant !== null,
    ),
  };
}

export async function fetchPortfolioContent(): Promise<PortfolioContent> {
  const supabase = getSupabaseClient();

  const [
    heroRes,
    footerRes,
    siteSettingsRes,
    galleryCategoriesRes,
    galleryRes,
    videosRes,
    gearRes,
  ] =
    await Promise.all([
      supabase
        .from("hero")
        .select(
          "title, subtitle, description, cta_text, portrait_path, status, published_at",
        )
        .eq("id", true)
        .eq("status", "published")
        .maybeSingle(),
      supabase
        .from("footer_settings")
        .select("heading, cta_text, copyright_text, status, published_at")
        .eq("id", true)
        .eq("status", "published")
        .maybeSingle(),
      supabase
        .from("site_settings")
        .select(
          "site_name, tagline, email, phone, instagram, x, behance, default_title, default_description",
        )
        .eq("id", true)
        .maybeSingle(),
      supabase
        .from("gallery_categories")
        .select("name, sort_order")
        .order("sort_order", { ascending: true }),
      supabase
        .from("gallery_items")
        .select(
          "image_path, alt_text, sort_order, status, gallery_categories(name)",
        )
        .eq("status", "published")
        .order("sort_order", { ascending: true }),
      supabase
        .from("videos")
        .select("id, title, youtube_id, youtube_url, sort_order, status")
        .eq("status", "published")
        .order("sort_order", { ascending: true }),
      supabase
        .from("gear_items")
        .select("title, subtitle, description, sort_order, status")
        .eq("status", "published")
        .order("sort_order", { ascending: true }),
    ]);

  const errors = [
    heroRes.error,
    footerRes.error,
    siteSettingsRes.error,
    galleryCategoriesRes.error,
    galleryRes.error,
    videosRes.error,
    gearRes.error,
  ].filter(Boolean);
  if (errors.length > 0) {
    throw new Error(errors[0]?.message || "Failed to load CMS content.");
  }

  const heroContent = heroRes.data ? await mapHeroContent(heroRes.data) : null;
  const gallery = await Promise.all(
    (galleryRes.data ?? []).map(async (row) => {
      const categoryPayload = row.gallery_categories as
        | { name: string }
        | { name: string }[]
        | null;
      const categoryName = Array.isArray(categoryPayload)
        ? categoryPayload[0]?.name
        : categoryPayload?.name;

      const image = await resolveResponsiveImageSet(row.image_path, {
        fallbackWidth: 1200,
        fallbackQuality: 72,
        sizes: "(min-width: 1024px) 20vw, 50vw",
        maxWidth: 1600,
      });

      return {
        src: image.src,
        alt: row.alt_text ?? "",
        category: categoryName ?? "",
        order: row.sort_order ?? 0,
        image,
      } satisfies GalleryContentItem;
    }),
  );

  const videos = (videosRes.data ?? []).map((row) => ({
    id: row.id,
    title: row.title ?? "",
    youtubeId: extractYoutubeId(row.youtube_id ?? row.youtube_url),
  }));

  const gear = (gearRes.data ?? []).map((row) => ({
    title: row.title || "",
    subtitle: row.subtitle || "",
    desc: row.description || "",
    order: row.sort_order ?? 0,
  }));

  return {
    hero: heroContent,
    footer: footerRes.data
      ? {
          heading: footerRes.data.heading ?? "",
          ctaText: footerRes.data.cta_text ?? "",
          copyright: footerRes.data.copyright_text ?? "",
        }
      : null,
    siteSettings: {
      brand: {
        siteName: siteSettingsRes.data?.site_name ?? "",
        tagline: siteSettingsRes.data?.tagline ?? "",
      },
      contact: {
        email: siteSettingsRes.data?.email ?? "",
        phone: siteSettingsRes.data?.phone ?? "",
      },
      social: {
        instagram: siteSettingsRes.data?.instagram ?? "",
        x: siteSettingsRes.data?.x ?? "",
        behance: siteSettingsRes.data?.behance ?? "",
      },
      seo: {
        defaultTitle: siteSettingsRes.data?.default_title ?? "",
        defaultDescription: siteSettingsRes.data?.default_description ?? "",
      },
    },
    galleryCategories: (galleryCategoriesRes.data ?? [])
      .map((row) => row.name ?? "")
      .filter((name) => name.trim().length > 0),
    gallery: gallery.filter((item) => item.src && item.category),
    videos: videos.filter((item) => item.youtubeId),
    gear: gear.filter((item) => item.title),
  };
}

export async function fetchHeroContent(): Promise<HeroContent | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("hero")
    .select("title, subtitle, description, cta_text, portrait_path, status, published_at")
    .eq("id", true)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  return mapHeroContent(data);
}
