import {
  Banknote,
  BadgePercent,
  Boxes,
  Building2,
  Factory,
  FlaskConical,
  Globe,
  HeartPulse,
  Landmark,
  Leaf,
  type LucideIcon,
  Package,
  Route,
  SprayCan,
  Truck,
  Warehouse,
} from 'lucide-react'

/** Prefix for files in /public. Set when building for GitHub Pages, which serves the site from a sub-path. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
/** Photos of Harvestfield fields supplied by the company (public/photos) */
export const photos = {
  fieldTeam: `${basePath}/photos/field-team.jpg`,
  farmlandAerialRoad: `${basePath}/photos/farmland-aerial-road.jpg`,
  farmlandAerial: `${basePath}/photos/farmland-aerial.jpg`,
}
/** Fallback still wherever there is no video or post cover */
export const heroImage = photos.fieldTeam
/** Banner photos for inner pages that don't use the field video. Other pages keep the video until their own photos are supplied. */
export const pageHeroImages = {
  /** Free Unsplash stock photo of an empty boardroom, until a photo of Harvestfield's own boardroom is supplied */
  leadership: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1920&q=80',
}
export const isoLogo = `${basePath}/iso-logo.png`

/**
 * Looping background video for the page heroes (files in public/video): drone footage of a Harvestfield field.
 * Desktop is 1920x1080, phones get a 540x960 portrait cut; the posters are each file's first frame. Null keeps the still hero image.
 */
export const heroVideo: { desktop: string; mobile: string; poster: string; posterMobile: string } | null = {
  desktop: `${basePath}/video/hero-desktop.mp4`,
  mobile: `${basePath}/video/hero-mobile.mp4`,
  poster: `${basePath}/video/hero-poster.jpg`,
  posterMobile: `${basePath}/video/hero-poster-mobile.jpg`,
}

export const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Harvestfield%20logo-keuACfSbuJYwID4OMJi7q3hhtaZpVk.png'
export const wordmarkUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/harevstfield%20logo%202-SR2RUhuHn5RZ9Zda9HabOxP9ZPwM3v.png'

export const contact = {
  phone: '0807 356 9437',
  phoneHref: 'tel:+2348073569437',
  email: 'info@harvestfield-ng.com',
  /** Lagos head office */
  address: [
    '1, Isheri Road, Olowora Junction B/Stop',
    '(Beside Sweet Sensation)',
    'Omole Phase II, Ikeja,',
    'P.O.Box 3979, Oshodi, Lagos, Nigeria.',
  ],
  mapHref: 'https://www.google.com/maps/search/?api=1&query=1+Isheri+Road+Olowora+Junction+Omole+Phase+II+Ikeja+Lagos',
}

export const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/leadership', label: 'Leadership' },
  { href: '/products', label: 'Products' },
  { href: '/partners', label: 'Partners' },
  { href: '/free-trade-zone', label: 'Free Trade Zone' },
  { href: '/offices', label: 'Our Offices' },
  { href: '/media', label: 'Media' },
]

export type Product = { slug: string; name: string; type: string; image: string; text: string; icon: LucideIcon }

/** The four product divisions, as cards on the homepage and in the menus. Slugs match the division anchors on /products. */
export const products: Product[] = [
  { slug: 'agro-inputs', name: 'Agro inputs', type: 'Crop production', icon: Leaf, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=85', text: 'Pesticides, fertilisers, seeds and biological control products, including Aflasafe.' },
  { slug: 'public-health', name: 'Public health', type: 'Vector control', icon: HeartPulse, image: `${basePath}/categories/vector-control.jpg`, text: 'Mosquito nets, larvicides and LSM products for malaria prevention across Nigeria.' },
  { slug: 'spraying-equipment', name: 'Spraying equipment', type: 'Field-ready tools', icon: SprayCan, image: `${basePath}/categories/spraying-equipment.jpg`, text: 'Agricultural sprayers for every scale of operation, from smallholder to commercial farm.' },
  { slug: 'post-harvest', name: 'Post-harvest', type: 'Storage', icon: Warehouse, image: `${basePath}/categories/store-fumigants.svg`, text: 'Store fumigants that keep harvested grain safe and saleable while it waits for market.' },
]

/** Regional offices and warehouses (provisional list from the 2026 website review). */
export const offices = [
  { region: 'North West', cities: ['Kano', 'Kaduna', 'Zuru (Kebbi)', 'Sokoto'] },
  { region: 'North East', cities: ['Bauchi', 'Mubi', 'Gombe', 'Yola', 'Jalingo'] },
  { region: 'North Central', cities: ['Abuja', 'Ilorin', 'Makurdi', 'Lafia', 'Minna', 'Kontagora', 'Anyigba'] },
  { region: 'South West', cities: ['Lagos', 'Ibadan', 'Ile-Ife', 'Ogun State'] },
  { region: 'South East', cities: ['Onitsha', 'Abakaliki', 'Aba'] },
  { region: 'South South', cities: ['Ikom'] },
]

/** Number of locations in the directory above, used wherever the site quotes the size of the network */
export const officeCount = offices.reduce((total, office) => total + office.cities.length, 0)

export const ftzBenefits: { title: string; short: string; text: string; icon: LucideIcon }[] = [
  { title: 'Zero import and export duties', short: 'Every good moving in and out of the zone is duty-exempt.', text: 'All goods moving in and out of the zone are fully duty-exempt under the free zone framework.', icon: BadgePercent },
  { title: 'Tax holidays and incentives', short: 'Start free of corporate income tax for an initial period.', text: 'Operate free from corporate income tax for an initial period, with additional incentives under Nigeria’s free zone regulations.', icon: Landmark },
  { title: 'No foreign exchange restrictions', short: 'Repatriate capital and profits freely.', text: 'Free repatriation of capital and profits. No bureaucratic barriers to moving money in or out.', icon: Banknote },
  { title: 'Built-in market access', short: 'Anchor production creates demand from day one.', text: 'Harvestfield Healthcare FZE’s anchor production creates immediate demand for packaging, logistics, raw materials and ancillary services within the zone.', icon: Boxes },
  { title: 'Strategic Ogun State location', short: 'On the Lagos-Ibadan corridor, with road, port and customs links.', text: 'Strategic position along the Lagos-Ibadan corridor with road, port and customs connectivity built in.', icon: Route },
  { title: 'West Africa export gateway', short: 'A ready regional and international market.', text: 'Nigeria accounts for 27% of global malaria burden. Products manufactured here have a ready regional and international market.', icon: Globe },
]

export const ftzStats = [
  { value: '$30M+', label: 'In anchor investment capacity' },
  { value: '600+', label: 'Jobs projected at full operation' },
]

export const ftzAudiences: { title: string; icon: LucideIcon }[] = [
  { title: 'Manufacturers', icon: Factory },
  { title: 'Packagers', icon: Package },
  { title: 'Logistics providers', icon: Truck },
  { title: 'Healthcare MSMEs', icon: FlaskConical },
]

export const ftzQuote = {
  text: 'Harvestfield FTZ is strategic and focused on addressing key deficits in the health sector. This opens up a new opportunity for the country to become an exporter of health products.',
  author: 'Dr. Olufemi Ogunyemi',
  role: 'Managing Director, public-sector partner',
}

export type Partner = { name: string; role: string }

export const distributionPartners: Partner[] = [
  { name: 'BASF', role: 'Authorized distributor' },
  { name: 'Corteva Agriscience', role: 'Authorized distributor' },
  { name: 'Lion Seeds', role: 'Authorized distributor' },
  { name: 'IITA', role: 'Authorized distributor' },
  { name: 'Sumitomo', role: 'Public health / LSM partner' },
]

export const partnerNames = distributionPartners.map((partner) => partner.name)

export const strategicPartners: { name: string; role: string; text: string; icon: LucideIcon }[] = [
  { name: 'Roll Back Malaria', role: 'National programme', text: 'We have distributed malaria vector control products across Nigeria as part of the national programme since we opened.', icon: HeartPulse },
  { name: 'Food Convergence Initiative', role: 'Founding member', text: 'Working with government and development partners on food safety and aflatoxin control.', icon: Building2 },
]

export const milestones = [
  { marker: '2000', title: 'Harvestfield is founded', text: 'We open as an agrochemical importer with a simple belief: Nigerian farmers deserve world-class inputs at fair prices.' },
  { marker: 'Since day one', title: 'Roll Back Malaria', text: 'Malaria vector control products distributed across Nigeria as part of the national programme.' },
  { marker: 'Licence', title: 'National Aflasafe licence', text: 'We hold the national licence for Aflasafe, the biocontrol product that cuts aflatoxin in maize and groundnut by up to 99%.' },
  { marker: 'Founding member', title: 'Food Convergence Initiative', text: 'Working with government and development partners on food safety and aflatoxin control.' },
  { marker: 'Feb 2026', title: 'Harvestfield Free Trade Zone', text: 'The Declaration of Licence and Operation Licence are presented for our medical manufacturing zone in Ogun State.' },
]

export const news = [
  { tag: 'Free Trade Zone', date: 'February 2026', title: 'Harvestfield Free Trade Zone receives operating licences', text: 'Harvestfield Industries received both the Declaration of Licence and the Operation Licence for a Free Trade Zone focused on medical products in Ogun State, one of the few in Nigeria dedicated entirely to healthcare manufacturing.', href: '/free-trade-zone' },
  { tag: 'Food safety', date: 'National licence', title: 'Bringing Aflasafe to Nigerian farms', text: 'As national Aflasafe licence holder, we supply the biocontrol product that cuts aflatoxin in maize and groundnut by up to 99%.', href: '/products#aflasafe' },
  { tag: 'Public health', date: 'Since 2000', title: 'Supporting Roll Back Malaria', text: 'Malaria vector control products distributed across Nigeria as part of the national programme since we opened.', href: '/products#public-health' },
  { tag: 'Food safety', date: 'Founding member', title: 'A founding member of the Food Convergence Initiative', text: 'Working with government and development partners on food safety and aflatoxin control.', href: '/about' },
  { tag: 'Network', date: 'Nationwide', title: `${officeCount} offices across all six geopolitical zones`, text: 'Walk in, call ahead, or send us a message and someone will get back to you the same day.', href: '/offices' },
]

export const contactTopics = [
  { value: 'general', label: 'General enquiry' },
  { value: 'products', label: 'Products & pricing' },
  { value: 'ftz', label: 'Free Trade Zone' },
  { value: 'partnerships', label: 'Partnerships' },
  { value: 'offices', label: 'Office or stock enquiry' },
  { value: 'press', label: 'Press & media' },
]
