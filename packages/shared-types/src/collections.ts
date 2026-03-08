/**
 * Shared collection types for HSG MinLaw Heritage
 * These types are derived from Payload CMS collections and are safe for frontend use.
 */

// ============================================================================
// Media Types
// ============================================================================

export interface MediaSize {
  url?: string | null;
  width?: number | null;
  height?: number | null;
  mimeType?: string | null;
  filesize?: number | null;
  filename?: string | null;
}

export interface Media {
  id: number;
  alt: string;
  description?: string | null;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    thumbnail?: MediaSize;
    medium?: MediaSize;
  };
  updatedAt: string;
  createdAt: string;
}

// ============================================================================
// Rich Text Content Types (Lexical)
// ============================================================================

export interface LexicalContent {
  root: {
    type: string;
    children: {
      type: string;
      version: number;
      [k: string]: unknown;
    }[];
    direction: ('ltr' | 'rtl') | null;
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
    indent: number;
    version: number;
  };
  [k: string]: unknown;
}

// ============================================================================
// Trail Types
// ============================================================================

export interface Trail3DObject {
  file?: number | Media | null;
  caption?: string | null;
  id?: string | null;
}

export interface TrailCoordinates {
  x: number;
  y: number;
}

export interface Trail {
  id: number;
  title: string;
  subTitle?: string | null;
  description: string;
  location?: string | null;
  completion?: string | null;
  architect?: string | null;
  yearsOfUse?: string | null;
  nameToday?: string | null;
  otherHistoricalNames?: string | null;
  trailImage?: number | Media | null;
  backgroundImage?: number | Media | null;
  '3dObjects'?: Trail3DObject[] | null;
  coordinatesGroup: TrailCoordinates;
  content?: LexicalContent | null;
  updatedAt: string;
  createdAt: string;
}

// ============================================================================
// Guided Tour Types
// ============================================================================

export interface GuidedTourImage {
  file?: number | Media | null;
  caption?: string | null;
  id?: string | null;
}

export interface GuidedTour {
  id: number;
  title: string;
  subTitle?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  time?: string | null;
  venue?: string | null;
  admission?: string | null;
  images?: GuidedTourImage[] | null;
  content?: LexicalContent | null;
  updatedAt: string;
  createdAt: string;
}

// ============================================================================
// Roving Exhibition Types
// ============================================================================

export interface RovingExhibitionImage {
  file?: number | Media | null;
  caption?: string | null;
  id?: string | null;
}

export interface RovingExhibition {
  id: number;
  title: string;
  subTitle?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  time?: string | null;
  venue?: string | null;
  admission?: string | null;
  images?: RovingExhibitionImage[] | null;
  content?: LexicalContent | null;
  updatedAt: string;
  createdAt: string;
}

// ============================================================================
// User Types (Public-safe subset)
// ============================================================================

export type UserRole = 'admin' | 'manager';

export interface PublicUser {
  id: number;
  email: string;
  role: UserRole;
  updatedAt: string;
  createdAt: string;
}

// ============================================================================
// Collection Slugs
// ============================================================================

export const COLLECTION_SLUGS = {
  USERS: 'users',
  MEDIA: 'media',
  TRAILS: 'trails',
  GUIDED_TOURS: 'guided-tours',
  ROVING_EXHIBITIONS: 'roving-exhibitions',
  AUDIT_LOGS: 'audit-logs',
} as const;

export type CollectionSlug = (typeof COLLECTION_SLUGS)[keyof typeof COLLECTION_SLUGS];

// ============================================================================
// API Response Types
// ============================================================================

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface SingleDocResponse<T> {
  doc: T;
}

// ============================================================================
// Type Guards
// ============================================================================

export function isMedia(value: number | Media | null | undefined): value is Media {
  return value !== null && value !== undefined && typeof value === 'object' && 'url' in value;
}

export function isPopulatedMedia(value: number | Media | null | undefined): value is Media {
  return isMedia(value);
}
