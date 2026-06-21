import {
  getSupabaseClient,
  getSupabaseStorageBucket,
} from "@/lib/supabase-client";

type ResponsiveImageFormat = "webp";

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

type ImageDeliverySettings = {
  responsiveVariantsEnabled: boolean;
  responsiveWidths: number[];
  formatQuality: {
    webp: number;
  };
  hero: {
    fallbackWidth: number;
    fallbackQuality: number;
  };
  gallery: {
    fallbackWidth: number;
    fallbackQuality: number;
  };
};

const DEFAULT_IMAGE_DELIVERY_SETTINGS: ImageDeliverySettings = {
  responsiveVariantsEnabled: true,
  responsiveWidths: [480, 768, 1080, 1440],
  formatQuality: {
    webp: 68,
  },
  hero: {
    fallbackWidth: 1440,
    fallbackQuality: 72,
  },
  gallery: {
    fallbackWidth: 1080,
    fallbackQuality: 66,
  },
};
const STABLE_HERO_STORAGE_PATH = "gallery/hero-current.webp";
const MAX_COMPRESSED_IMAGE_BYTES = 150 * 1024;

export type HeroContent = {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  portraitUrl: string;
  portraitPath?: string;
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
  imagePath?: string;
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

function toClampedInt(value: unknown, fallback: number, min: number, max: number) {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : Number.NaN;
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, Math.round(parsed)));
}

function normalizeResponsiveWidths(value: unknown, fallback: number[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const widths = value
    .map((item) => toClampedInt(item, Number.NaN, 200, 4000))
    .filter((item) => Number.isFinite(item));
  if (widths.length === 0) {
    return fallback;
  }

  return Array.from(new Set(widths)).sort((a, b) => a - b);
}

function parseImageDeliverySettings(value: unknown): ImageDeliverySettings {
  if (!value || typeof value !== "object") {
    return DEFAULT_IMAGE_DELIVERY_SETTINGS;
  }

  const raw = value as {
    responsiveVariantsEnabled?: unknown;
    responsiveWidths?: unknown;
    formatQuality?: {
      webp?: unknown;
    };
    hero?: {
      fallbackWidth?: unknown;
      fallbackQuality?: unknown;
    };
    gallery?: {
      fallbackWidth?: unknown;
      fallbackQuality?: unknown;
    };
  };

  return {
    responsiveVariantsEnabled:
      typeof raw.responsiveVariantsEnabled === "boolean"
        ? raw.responsiveVariantsEnabled
        : DEFAULT_IMAGE_DELIVERY_SETTINGS.responsiveVariantsEnabled,
    responsiveWidths: normalizeResponsiveWidths(
      raw.responsiveWidths,
      DEFAULT_IMAGE_DELIVERY_SETTINGS.responsiveWidths,
    ),
    formatQuality: {
      webp: toClampedInt(
        raw.formatQuality?.webp,
        DEFAULT_IMAGE_DELIVERY_SETTINGS.formatQuality.webp,
        20,
        95,
      ),
    },
    hero: {
      fallbackWidth: toClampedInt(
        raw.hero?.fallbackWidth,
        DEFAULT_IMAGE_DELIVERY_SETTINGS.hero.fallbackWidth,
        200,
        4000,
      ),
      fallbackQuality: toClampedInt(
        raw.hero?.fallbackQuality,
        DEFAULT_IMAGE_DELIVERY_SETTINGS.hero.fallbackQuality,
        20,
        95,
      ),
    },
    gallery: {
      fallbackWidth: toClampedInt(
        raw.gallery?.fallbackWidth,
        DEFAULT_IMAGE_DELIVERY_SETTINGS.gallery.fallbackWidth,
        200,
        4000,
      ),
      fallbackQuality: toClampedInt(
        raw.gallery?.fallbackQuality,
        DEFAULT_IMAGE_DELIVERY_SETTINGS.gallery.fallbackQuality,
        20,
        95,
      ),
    },
  };
}

function mapHeroContent(
  data: {
  title: string | null;
  subtitle: string | null;
  description: string | null;
  cta_text: string | null;
  portrait_path: string | null;
  },
  imageDelivery: ImageDeliverySettings,
): Promise<HeroContent> {
  return resolveHeroPortraitImage(data.portrait_path, imageDelivery).then((heroPortraitImage) => ({
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    description: data.description ?? "",
    ctaText: data.cta_text ?? "",
    portraitUrl: heroPortraitImage.src,
    portraitPath: data.portrait_path ?? STABLE_HERO_STORAGE_PATH,
    portraitImage: heroPortraitImage,
  }));
}

async function resolveHeroPortraitImage(
  portraitPath: string | null,
  imageDelivery: ImageDeliverySettings,
): Promise<ResponsiveImageSet> {
  const stableHeroImage = await resolveResponsiveImageSet(STABLE_HERO_STORAGE_PATH, {
    imageDelivery,
    fallbackWidth: imageDelivery.hero.fallbackWidth,
    fallbackQuality: imageDelivery.hero.fallbackQuality,
    sizes: "(min-width: 1024px) 30vw, 70vw",
    maxWidth: 1600,
  });

  if (stableHeroImage.src) {
    return stableHeroImage;
  }

  if (!portraitPath || portraitPath === STABLE_HERO_STORAGE_PATH) {
    return stableHeroImage;
  }

  return resolveResponsiveImageSet(portraitPath, {
    imageDelivery,
    fallbackWidth: imageDelivery.hero.fallbackWidth,
    fallbackQuality: imageDelivery.hero.fallbackQuality,
    sizes: "(min-width: 1024px) 30vw, 70vw",
    maxWidth: 1600,
  });
}

function isAbsoluteAssetPath(path: string) {
  return /^(https?:\/\/|data:|blob:)/i.test(path);
}

function isMissingImageDeliveryColumnError(error: { message?: string } | null | undefined) {
  if (!error?.message) {
    return false;
  }
  const message = error.message.toLowerCase();
  return message.includes("image_delivery_settings") && message.includes("column");
}

async function fetchSiteSettingsRow(supabase: ReturnType<typeof getSupabaseClient>) {
  const withImageSettings = await supabase
    .from("site_settings")
    .select(
      "site_name, tagline, email, phone, instagram, x, behance, default_title, default_description, image_delivery_settings",
    )
    .eq("id", true)
    .maybeSingle();

  if (withImageSettings.error && isMissingImageDeliveryColumnError(withImageSettings.error)) {
    const fallback = await supabase
      .from("site_settings")
      .select("site_name, tagline, email, phone, instagram, x, behance, default_title, default_description")
      .eq("id", true)
      .maybeSingle();
    if (fallback.error) {
      throw new Error(fallback.error.message);
    }
    if (!fallback.data) {
      return null;
    }
    return {
      ...fallback.data,
      image_delivery_settings: null,
    };
  }

  if (withImageSettings.error) {
    throw new Error(withImageSettings.error.message);
  }

  return withImageSettings.data;
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
  const bucket = getSupabaseStorageBucket();
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 60, {
    transform,
  });

  if (error || !data?.signedUrl) {
    return "";
  }

  return data.signedUrl;
}

async function resolveResponsiveImageSet(
  path: string | null | undefined,
  options: {
    imageDelivery: ImageDeliverySettings;
    fallbackWidth: number;
    fallbackQuality: number;
    sizes: string;
    maxWidth?: number;
  },
): Promise<ResponsiveImageSet> {
  const src = await resolveStorageUrl(path, {
    width: options.fallbackWidth,
    quality: options.fallbackQuality,
    format: "webp",
  });

  if (!path || isAbsoluteAssetPath(path)) {
    return { src, sizes: options.sizes, variants: [] };
  }

  if (!options.imageDelivery.responsiveVariantsEnabled) {
    return { src, sizes: options.sizes, variants: [] };
  }

  const widths = options.imageDelivery.responsiveWidths.filter(
    (width) => options.maxWidth == null || width <= options.maxWidth,
  );
  const webpQuality = options.imageDelivery.formatQuality.webp;
  const variantResults = await Promise.all(
    widths.map(async (width) => {
      const url = await resolveStorageUrl(path, {
        width,
        quality: webpQuality,
        format: "webp",
      });
      if (!url) {
        return null;
      }
      return {
        format: "webp",
        width,
        url,
      } satisfies ResponsiveImageVariant;
    }),
  );

  return {
    src,
    sizes: options.sizes,
    variants: variantResults.filter(
      (variant): variant is ResponsiveImageVariant => variant !== null,
    ),
  };
}

async function isCompressedStorageObject(path: string | null | undefined) {
  if (!path || isAbsoluteAssetPath(path)) {
    return false;
  }

  const rawUrl = await resolveStorageUrl(path);
  if (!rawUrl) {
    return false;
  }

  try {
    const response = await fetch(`${rawUrl}${rawUrl.includes("?") ? "&" : "?"}cb=${Date.now()}`, {
      method: "HEAD",
    });
    if (!response.ok) {
      return false;
    }

    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
    const contentLength = Number(response.headers.get("content-length"));
    const hasSize = Number.isFinite(contentLength) && contentLength >= 0;
    return contentType.includes("image/webp") && hasSize && contentLength <= MAX_COMPRESSED_IMAGE_BYTES;
  } catch {
    return false;
  }
}

export async function fetchPortfolioContent(): Promise<PortfolioContent> {
  const supabase = getSupabaseClient();

  const [heroRes, footerRes, siteSettingsRow, galleryCategoriesRes, galleryRes, videosRes, gearRes] =
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
      fetchSiteSettingsRow(supabase),
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
    galleryCategoriesRes.error,
    galleryRes.error,
    videosRes.error,
    gearRes.error,
  ].filter(Boolean);
  if (errors.length > 0) {
    throw new Error(errors[0]?.message || "Failed to load CMS content.");
  }

  const imageDelivery = parseImageDeliverySettings(siteSettingsRow?.image_delivery_settings);
  const heroContent = heroRes.data ? await mapHeroContent(heroRes.data, imageDelivery) : null;
  const gallery = await Promise.all(
    (galleryRes.data ?? []).map(async (row) => {
      const compressed = await isCompressedStorageObject(row.image_path);
      if (!compressed) {
        return null;
      }

      const categoryPayload = row.gallery_categories as
        | { name: string }
        | { name: string }[]
        | null;
      const categoryName = Array.isArray(categoryPayload)
        ? categoryPayload[0]?.name
        : categoryPayload?.name;

      const image = await resolveResponsiveImageSet(row.image_path, {
        imageDelivery,
        fallbackWidth: imageDelivery.gallery.fallbackWidth,
        fallbackQuality: imageDelivery.gallery.fallbackQuality,
        sizes: "(min-width: 1024px) 20vw, 50vw",
        maxWidth: 1600,
      });

      return {
        src: image.src,
        alt: row.alt_text ?? "",
        category: categoryName ?? "",
        order: row.sort_order ?? 0,
        imagePath: row.image_path ?? "",
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
        siteName: siteSettingsRow?.site_name ?? "",
        tagline: siteSettingsRow?.tagline ?? "",
      },
      contact: {
        email: siteSettingsRow?.email ?? "",
        phone: siteSettingsRow?.phone ?? "",
      },
      social: {
        instagram: siteSettingsRow?.instagram ?? "",
        x: siteSettingsRow?.x ?? "",
        behance: siteSettingsRow?.behance ?? "",
      },
      seo: {
        defaultTitle: siteSettingsRow?.default_title ?? "",
        defaultDescription: siteSettingsRow?.default_description ?? "",
      },
    },
    galleryCategories: (galleryCategoriesRes.data ?? [])
      .map((row) => row.name ?? "")
      .filter((name) => name.trim().length > 0),
    gallery: gallery.filter(
      (item): item is GalleryContentItem => item !== null && Boolean(item.src) && Boolean(item.category),
    ),
    videos: videos.filter((item) => item.youtubeId),
    gear: gear.filter((item) => item.title),
  };
}

export async function fetchHeroContent(): Promise<HeroContent | null> {
  const supabase = getSupabaseClient();
  const [heroRes, siteSettingsRow] = await Promise.all([
    supabase
      .from("hero")
      .select("title, subtitle, description, cta_text, portrait_path, status, published_at")
      .eq("id", true)
      .eq("status", "published")
      .maybeSingle(),
    fetchSiteSettingsRow(supabase),
  ]);

  if (heroRes.error) {
    throw new Error(heroRes.error.message);
  }
  if (!heroRes.data) {
    return null;
  }

  const imageDelivery = parseImageDeliverySettings(siteSettingsRow?.image_delivery_settings);
  return mapHeroContent(heroRes.data, imageDelivery);
}

export async function rehydrateCachedPortfolioContent(content: PortfolioContent | null) {
  if (!content) {
    return null;
  }

  const imageDelivery = DEFAULT_IMAGE_DELIVERY_SETTINGS;
  const heroPath = content.hero?.portraitPath;
  const heroImage = heroPath
    ? await resolveHeroPortraitImage(heroPath, imageDelivery)
    : await resolveHeroPortraitImage(STABLE_HERO_STORAGE_PATH, imageDelivery);

  const hero = content.hero
    ? {
        ...content.hero,
        portraitUrl: heroImage.src,
        portraitPath: heroPath ?? STABLE_HERO_STORAGE_PATH,
        portraitImage: heroImage.src ? heroImage : undefined,
      }
    : null;

  const gallery = await Promise.all(
    content.gallery.map(async (item) => {
      const imagePath = item.imagePath;
      if (!imagePath) {
        return {
          ...item,
          src: "",
          image: undefined,
        } satisfies GalleryContentItem;
      }

      const compressed = await isCompressedStorageObject(imagePath);
      if (!compressed) {
        return {
          ...item,
          src: "",
          image: undefined,
        } satisfies GalleryContentItem;
      }

      const image = await resolveResponsiveImageSet(imagePath, {
        imageDelivery,
        fallbackWidth: imageDelivery.gallery.fallbackWidth,
        fallbackQuality: imageDelivery.gallery.fallbackQuality,
        sizes: "(min-width: 1024px) 20vw, 50vw",
        maxWidth: 1600,
      });

      return {
        ...item,
        src: image.src,
        image,
      } satisfies GalleryContentItem;
    }),
  );

  return {
    ...content,
    hero,
    gallery: gallery.filter((item) => item.src && item.category),
  } satisfies PortfolioContent;
}
