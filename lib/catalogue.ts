import { Bug, Droplets, HeartPulse, Leaf, type LucideIcon, Sprout } from 'lucide-react'
import { basePath } from '@/lib/site-data'

/** Product groups on the Products page. Slugs match the category anchors used across the site (/products#herbicides). */
export type CatalogueGroup = { slug: string; name: string; text: string; icon: LucideIcon }

export const catalogueGroups: CatalogueGroup[] = [
  { slug: 'herbicides', name: 'Herbicides', icon: Leaf, text: 'Selective and total weed control for every major Nigerian crop, from pre-plant clearing to post-emergence.' },
  { slug: 'insecticides', name: 'Insecticides', icon: Bug, text: 'Field-proven pest control for cocoa, cotton, vegetables and grain crops.' },
  { slug: 'fungicides', name: 'Fungicides', icon: Sprout, text: 'Protection against black pod, blight, downy mildew and other crop diseases.' },
  { slug: 'vector-control', name: 'Vector control', icon: HeartPulse, text: 'For treating mosquito nets and indoor residual spraying.' },
  { slug: 'fertilisers', name: 'Fertilisers', icon: Droplets, text: 'Foliar nutrition to support healthy growth and yield.' },
]

export type CatalogueItem = {
  slug: string
  name: string
  group: string
  /** Active ingredients and formulation, as printed on the label */
  composition: string
  use: string
  pack?: string
  /** Application rate, only where Harvestfield has published one (old product profile); otherwise the label applies */
  dose?: string
  /** Overrides the formulation read from the composition code */
  formulation?: string
}

const formulationNames: Record<string, string> = {
  EC: 'Emulsifiable concentrate',
  SL: 'Soluble liquid',
  SC: 'Suspension concentrate',
  WP: 'Wettable powder',
  WDG: 'Water-dispersible granules',
}

export function formulationOf(item: CatalogueItem) {
  if (item.formulation) return item.formulation
  const code = item.composition.match(/\b(EC|SL|SC|WP|WDG)\b/)?.[1]
  return code ? `${formulationNames[code]} (${code})` : undefined
}

export const packshot = (slug: string) => `${basePath}/packshots/${slug}.jpg`

export const catalogue: CatalogueItem[] = [
  // Herbicides
  { slug: 'clearweed', name: 'Clearweed', group: 'herbicides', dose: '3–4 L/ha (250–350 ml per 16 L of water)', composition: 'Glyphosate 480 g/l SL', use: 'Total herbicide. Foliar-acting control of annual weeds, perennial grasses, sedges, broadleaves and aquatic weeds.' },
  { slug: 'clearweed-plus', name: 'Clearweed Plus', group: 'herbicides', composition: 'Glyphosate 23.5% + 2,4-D 3% SL', use: 'Combines glyphosate with 2,4-D for broad-spectrum control of grasses and broadleaf weeds.' },
  { slug: 'razedown', name: 'Razedown', group: 'herbicides', dose: '3–4 L/ha (250–350 ml per 16 L of water)', composition: 'Glyphosate 480 g/l SL', use: 'Total herbicide for annual weeds, perennial grasses, sedges and broadleaves, for pre-plant clearing and tree crops.' },
  { slug: 'rakeout', name: 'Rakeout', group: 'herbicides', composition: 'Glyphosate 480 g/l SL', use: 'Foliar-acting herbicide for annual and perennial weeds, including grasses, sedges and broadleaves.' },
  { slug: 'relisate', name: 'Relisate', group: 'herbicides', dose: '3–4 L/ha (250–350 ml per 16 L of water)', composition: 'Glyphosate 360 g/l (as isopropylamine salt) SL', pack: '5 L', use: 'Total herbicide for annual weeds, perennial grasses, broadleaves and aquatic weeds.' },
  { slug: 'fieldklear-pro', name: 'FieldKlear Pro', group: 'herbicides', composition: 'L-Glufosinate 20% SL', use: 'Total herbicide for clearing grasses and broadleaf weeds.' },
  { slug: 'butacrush', name: 'Butacrush 50 EC', group: 'herbicides', composition: 'Butachlor 50% EC', pack: '1 L', dose: '4–6 L/ha (350–500 ml per 16 L of water)', use: 'Selective pre- and early post-emergence control of annual grasses and some broadleaf weeds in rice, maize, cotton, sorghum, cowpea, onion and chilli.' },
  { slug: 'vespanil-plus', name: 'Vespanil Plus', group: 'herbicides', composition: 'Propanil 360 g/l + 2,4-D 200 g/l', pack: '1 L', dose: '1.25–2.5 L/ha', use: 'Selective herbicide for weed control in rice.' },
  { slug: 'ryzatek', name: 'Ryzatek', group: 'herbicides', composition: 'Fluroxypyr-meptyl 230.7 g/l + Cyhalofop-butyl EC', pack: '250 ml', use: 'Selective herbicide for weed control in rice.' },
  { slug: 'relimine', name: 'Relimine', group: 'herbicides', composition: '2,4-D Dimethylamine 720 g/l SL', dose: '1.5–2.5 L/ha (125–200 ml per 16 L of water)', use: 'Post-emergence control of broadleaf weeds in rice, maize, sorghum, sugarcane, oil palm, banana and plantain.' },
  { slug: 'narodown', name: 'Narodown', group: 'herbicides', composition: 'Fluazifop-P-butyl 15% EC', pack: '1 L', use: 'Selective post-emergence herbicide that targets annual and perennial grasses.' },
  { slug: 'maverick', name: 'Maverick', group: 'herbicides', composition: 'Aclonifen 500 g/l + Isoxaflutole 75 g/l SC', pack: '250 ml', use: 'Herbicide for weed control in maize.' },
  { slug: 'weedlock', name: 'Weedlock', group: 'herbicides', composition: 'Terbuthylazine 50% WP', use: 'Controls a wide range of broadleaf weeds and some annual grasses in maize, sorghum, cassava, yam, pineapple and sugarcane.' },
  { slug: 'smuda', name: 'Smuda', group: 'herbicides', composition: 'Metribuzin 70% WP', pack: '100 g', use: 'Selective control of broadleaf weeds and grasses in crops such as groundnut, beans and potato.' },

  // Insecticides
  { slug: 'avesthrin', name: 'Avesthrin', group: 'insecticides', composition: 'Cypermethrin 10% EC', pack: '1 L', dose: '0.1–1 L/ha (10–100 ml per 16 L of water)', use: 'Insecticide with a wide range of activity on crops such as cocoa, cotton, tomato and beans.' },
  { slug: 'klasik', name: 'Klasik', group: 'insecticides', composition: 'Sulfoxaflor 40 g/l + Cypermethrin 40 g/l EC', pack: '250 ml', use: 'Insecticide for crops including cocoa, tomato and beans.' },
  { slug: 'resolva', name: 'Resolva', group: 'insecticides', composition: 'Imidacloprid 30 g/l + Bifenthrin 20 g/l EC', pack: '250 ml', use: 'Systemic and contact insecticide, used on cocoa.' },
  { slug: 'rebenta-wdg', name: 'Rebenta 5% WDG', group: 'insecticides', composition: 'Emamectin benzoate 50 g/kg WDG', pack: '100 g', use: 'Controls fall armyworm, cutworm, bollworm, whitefly and Tuta absoluta.' },
  { slug: 'rebenta-ec', name: 'Rebenta EC', group: 'insecticides', composition: 'Emamectin benzoate 2.15% EC', use: 'Liquid emamectin benzoate for caterpillars and other crop pests.' },

  // Fungicides
  { slug: 'ultimax-plus', name: 'Ultimax Plus', group: 'fungicides', composition: 'Copper(I) oxide 60% + Metalaxyl 12% WP', pack: '50 g', dose: '800–2,000 g/ha (about 50 g per 16 L of water)', use: 'Mainly applied to control black pod disease (Phytophthora) on cocoa.' },
  { slug: 'ultimax-prime', name: 'Ultimax Prime', group: 'fungicides', composition: 'Copper hydroxide 40% + Metalaxyl-M 20% WP', pack: '50 g', use: 'Mainly applied to control black pod disease (Phytophthora) on cocoa.' },
  { slug: 'superdual', name: 'SuperDual', group: 'fungicides', composition: 'Pyraclostrobin 40 g/l + Dimethomorph 72 g/l SC', pack: '1 L', use: 'Systemic fungicide for downy mildew in vegetables, late blight in tomato and potato, and cocoa black pod.' },
  { slug: 'banzel', name: 'Banzel', group: 'fungicides', composition: 'Mancozeb 64% + Metalaxyl-M 4% WP', pack: '50 g', use: 'Systemic and residual fungicide for early and late blight on susceptible crops.' },
  { slug: 'cupa-organo', name: 'Cupa Organo', group: 'fungicides', composition: 'Water-soluble copper 6% w/w SL', use: 'Systemic organic fungicide for bacterial and fungal diseases. Also prevents and corrects copper deficiency.' },

  // Vector control
  { slug: 'al-cypernet', name: 'Al-Cypernet 10 SC', group: 'vector-control', composition: 'Alphacypermethrin 100 g/l SC', use: 'Pyrethroid insecticide for flying and crawling insects. For treating mosquito nets and indoor surface spraying.' },

  // Fertilisers
  { slug: 'fertisol', name: 'Fertisol', group: 'fertilisers', composition: 'Free amino acids 12.2%, iron 2.1%, zinc 0.32%', pack: '1 L', formulation: 'Liquid foliar fertiliser', use: 'Liquid foliar fertiliser for vegetables, cotton, maize and other crops.' },
]
