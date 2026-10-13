import {
  Banknote,
  BadgePercent,
  Boxes,
  Bug,
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
  Sprout,
  Truck,
  Warehouse,
} from 'lucide-react'

/** Prefix for files in /public. Set when building for GitHub Pages, which serves the site from a sub-path. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
export const heroImage = `${basePath}/harvest-hero.png`

export const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-c5Ajz8p42rFP91uzjSPB9om8JLTye3.png'

export const contact = {
  phone: '0807 356 9437',
  phoneHref: 'tel:+2348073569437',
  email: 'info@harvestfield-ng.com',
}

export const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/partners', label: 'Partners' },
  { href: '/free-trade-zone', label: 'Free Trade Zone' },
  { href: '/offices', label: 'Our Offices' },
  { href: '/news', label: 'News' },
]

export type Product = { slug: string; name: string; type: string; image: string; text: string; icon: LucideIcon }

export const products: Product[] = [
  { slug: 'herbicides', name: 'Herbicides', type: 'Crop protection', icon: Leaf, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=85', text: 'Broad and selective options for weed control in all major Nigerian crop types.' },
  { slug: 'insecticides', name: 'Insecticides', type: 'Crop protection', icon: Bug, image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=900&q=85', text: 'Field-proven pest management that Nigerian farmers have relied on for over two decades.' },
  { slug: 'fungicides', name: 'Fungicides', type: 'Crop protection', icon: Sprout, image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=900&q=85', text: 'Disease management across the full growing cycle, from germination to harvest.' },
  { slug: 'store-fumigants', name: 'Store fumigants', type: 'Post-harvest', icon: Warehouse, image: 'https://images.unsplash.com/photo-1586528116493-da8b0b6e4a9b?auto=format&fit=crop&w=900&q=85', text: 'Keep post-harvest grain safe and saleable while it waits for market.' },
  { slug: 'vector-control', name: 'Vector control', type: 'Public health', icon: HeartPulse, image: 'https://images.unsplash.com/photo-1584467735871-2e2c0f2b7c9a?auto=format&fit=crop&w=900&q=85', text: 'Malaria control products supplied under the Roll Back Malaria programme across Nigeria.' },
  { slug: 'spraying-equipment', name: 'Spraying equipment', type: 'Field-ready tools', icon: SprayCan, image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0a1e7f?auto=format&fit=crop&w=900&q=85', text: 'Agricultural sprayers for every scale of operation, from smallholder to commercial farm.' },
]

export const productTypes = ['Crop protection', 'Post-harvest', 'Public health', 'Field-ready tools']

export const offices = [
  { region: 'North West', cities: ['Kano', 'Kaduna', 'Sokoto'] },
  { region: 'North East', cities: ['Maiduguri', 'Bauchi', 'Gombe'] },
  { region: 'North Central', cities: ['Abuja', 'Jos', 'Ilorin'] },
  { region: 'South West', cities: ['Lagos', 'Ibadan', 'Abeokuta'] },
  { region: 'South East', cities: ['Enugu', 'Onitsha', 'Owerri'] },
  { region: 'South South', cities: ['Port Harcourt', 'Warri', 'Benin'] },
]

export const ftzBenefits: { title: string; short: string; text: string; icon: LucideIcon }[] = [
  { title: 'Zero import and export duties', short: 'Every good moving in and out of the zone is duty-exempt.', text: 'All goods moving in and out of the zone are fully duty-exempt under the NEPZA framework.', icon: BadgePercent },
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

export const nepzaQuote = {
  text: 'Harvestfield FTZ is strategic and focused on addressing key deficits in the health sector. This opens up a new opportunity for the country to become an exporter of health products.',
  author: 'Dr. Olufemi Ogunyemi',
  role: 'MD/CEO, NEPZA',
}

export const distributionPartners = ['BAYER', 'BASF', 'Dow', 'East-West Seeds', 'IITA']

export const strategicPartners: { name: string; role: string; text: string; icon: LucideIcon }[] = [
  { name: 'NEPZA', role: 'Licensing authority', text: 'The Nigeria Export Processing Zones Authority granted the Declaration of Licence and Operation Licence for the Harvestfield FTZ in February 2026.', icon: Landmark },
  { name: 'Roll Back Malaria', role: 'National programme', text: 'We have distributed malaria vector control products across Nigeria as part of the national programme since we opened.', icon: HeartPulse },
  { name: 'Food Convergence Initiative', role: 'Founding member', text: 'Working with government and development partners on food safety and aflatoxin control.', icon: Building2 },
]

export const milestones = [
  { marker: '2000', title: 'Harvestfield is founded', text: 'We open as an agrochemical importer with a simple belief: Nigerian farmers deserve world-class inputs at fair prices.' },
  { marker: 'Since day one', title: 'Roll Back Malaria', text: 'Malaria vector control products distributed across Nigeria as part of the national programme.' },
  { marker: 'Licence', title: 'National Aflasafe licence', text: 'We hold the national licence for Aflasafe, the biocontrol product that cuts aflatoxin in maize and groundnut by up to 99%.' },
  { marker: 'Founding member', title: 'Food Convergence Initiative', text: 'Working with government and development partners on food safety and aflatoxin control.' },
  { marker: 'Feb 2026', title: 'Harvestfield Free Trade Zone', text: 'NEPZA presents the Declaration of Licence and Operation Licence for our medical manufacturing zone in Ogun State.' },
]

export const news = [
  { tag: 'Free Trade Zone', date: 'February 2026', title: 'NEPZA licenses the Harvestfield Free Trade Zone', text: 'The Nigeria Export Processing Zones Authority formally presented Harvestfield Industries with both the Declaration of Licence and the Operation Licence for a Free Trade Zone focused on medical products in Ogun State, one of the few in Nigeria dedicated entirely to healthcare manufacturing.', href: '/free-trade-zone' },
  { tag: 'Food safety', date: 'National licence', title: 'Bringing Aflasafe to Nigerian farms', text: 'As national Aflasafe licence holder, we supply the biocontrol product that cuts aflatoxin in maize and groundnut by up to 99%.', href: '/products#aflasafe' },
  { tag: 'Public health', date: 'Since 2000', title: 'Supporting Roll Back Malaria', text: 'Malaria vector control products distributed across Nigeria as part of the national programme since we opened.', href: '/products#vector-control' },
  { tag: 'Food safety', date: 'Founding member', title: 'A founding member of the Food Convergence Initiative', text: 'Working with government and development partners on food safety and aflatoxin control.', href: '/about' },
  { tag: 'Network', date: 'Nationwide', title: '26 offices across all six geopolitical zones', text: 'Walk in, call ahead, or send us a message and someone will get back to you the same day.', href: '/offices' },
]

export const contactTopics = [
  { value: 'general', label: 'General enquiry' },
  { value: 'products', label: 'Products & pricing' },
  { value: 'ftz', label: 'Free Trade Zone' },
  { value: 'partnerships', label: 'Partnerships' },
  { value: 'offices', label: 'Office or stock enquiry' },
  { value: 'press', label: 'Press & media' },
]
