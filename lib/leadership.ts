import { basePath } from '@/lib/site-data'

export type Leader = {
  slug: string
  name: string
  credentials?: string
  role: string
  /** One or two lines for the card; the full bio opens on "Read more". */
  intro: string
  bio: string[]
}

/** Portrait for a leader. Placeholders live in public/leadership/<slug>.jpg; overwrite them with real photos (4:5 portrait). */
export const leaderPhoto = (slug: string) => `${basePath}/leadership/${slug}.jpg`

export const board: Leader[] = [
  {
    slug: 'folake-sanu',
    name: 'Folake Sanu',
    credentials: 'FCA',
    role: 'Chairman, Board of Directors',
    intro: 'Banking and finance leader with over 40 years’ experience, and the first female Executive Director of WEMA Bank Plc.',
    bio: [
      'Folake Sanu is a transformation executive coach, board executive and an accomplished banking and finance expert with over 40 years of working experience spanning professional accounting practice and 30 years in banking at senior and executive management levels. She is a Fellow of the Institute of Chartered Accountants of Nigeria (FCA) and an Honorary Senior Member of the Chartered Institute of Bankers of Nigeria (CIBN).',
      'She began her career as a professional accountant with Peat Marwick Ani Ogunde & Co, where she spent over ten years auditing financial institutions, manufacturing and service companies, before transitioning into banking. She went on to lead and manage various transformational projects and strategic business units across four different Nigerian banks, with experience spanning Governance and Compliance, Finance, Corporate Strategy, Digital Transformation and Customer Experience, Operations and Technology, Risk Management, Audit, Mergers and Acquisitions, Project Management, Credit and Marketing.',
      'Her last banking role was at WEMA Bank Plc, where she became the bank’s first female Executive Director, a position she held for six years. She oversaw the Lagos Business Directorate before becoming Executive Director of Business Support, overseeing Sustainability and Corporate Social Responsibility, Human Capital Management, Operations, Customer Experience Management, Business Process Re-engineering, and Brand & Marketing Communications. During her tenure, she led the transformation of the bank’s service delivery and drove the digitization of core business processes, significantly strengthening the WEMA Bank brand.',
      'Folake is a results-oriented and motivating leader dedicated to the pursuit of excellence and is passionate about the advancement of women. She is a Life Member of WIMBIZ (Women in Management and Business), a partner in WAW (Women at Work), a Director at Elizabethan H & H, and a mentor with Women’s Lifestyle Hub.',
      'She is a keen leadership scholar and an alumna of the Harvard Business School Advanced Management Program and the London Business School Senior Management Program, and has completed executive leadership, digital transformation and governance programs at Harvard Business School, INSEAD Fontainebleau, IMD and other global learning institutions. She is the author of Life Lessons of a Nigerian Wonder Woman, a memoir written to inspire women to become resourceful and successful in their endeavours.',
      'Folake Sanu is currently the CEO of FS Global Advisory Services and an Independent Director with Remita Payment Services Limited, Coleman Cables Technical Company Limited and Alpha Morgan Bank.',
    ],
  },
  {
    slug: 'ola-olabinjo',
    name: 'Ola Olabinjo',
    role: 'Director',
    intro: 'Over 30 years in investment and corporate banking, risk management and treasury; Managing Director/CEO of Skystone Finance Company Limited.',
    bio: [
      'Ola Olabinjo is a seasoned professional with over 30 years of experience spanning Investment and Corporate Banking, Risk Management, Treasury, Transaction Banking and Operations. He has served as Executive Director and Divisional Head of Corporate and Commercial Banking at various commercial banks, with oversight of the Oil & Gas, Telecoms, Power, Construction, FMCG and Financial Institutions business groups.',
      'He began his career at Marina International Bank Limited as an Assistant Banking Officer, rising to Assistant Manager with experience in corporate banking, internal control and credit risk management. He subsequently moved to Prudent Bank Plc as Manager (Head of Operations), before rising through the ranks to Deputy General Manager at Skye Bank Plc, General Manager at FCMB, and Executive Director at Heritage Banking Limited. He is currently the Managing Director/CEO of Skystone Finance Company Limited.',
      'He is a Fellow of the Chartered Institute of Bankers of Nigeria (CIBN), a Fellow of the Institute of Credit Administration (ICA), and a member of the Institute of Directors (IoD). He also serves as a director on the boards of several companies, providing strategic advice and guidance.',
      'He has been involved in several key infrastructure projects, with extensive experience leading, advising, arranging and structuring acquisition financing for construction and development projects across sectors including power, oil and gas, real estate, telecommunications and FMCG, with particular expertise in debt solutions and management.',
    ],
  },
  {
    slug: 'adebayo-jimoh',
    name: 'Alhaji Adebayo Jimoh',
    role: 'Director',
    intro: 'Former Group Managing Director/CEO of Odua Investment Company Limited, after more than two decades with John Holt Plc.',
    bio: [
      'Alhaji Adebayo Jimoh is a multi-disciplinary professional with experience spanning both the private and public sectors of the economy, having spent over two decades with the British multinational conglomerate John Holt Plc and later headed a sub-regional conglomerate as Group Managing Director & Chief Executive. His exposure across these sectors has strengthened his capacity in strategic thinking and decision-making.',
      'He began his career as an Assistant Lecturer at the University of Ibadan, teaching Industrial Psychology and Organisational Behaviour, before transitioning into the conglomerate industry. He joined John Holt Plc as a Management Trainee in 1983 and rose through the ranks to become Deputy General Manager (Operations) in 1993, and General Manager of John Holt Ventures from 1994 to 1996.',
      'He subsequently served as General Manager at Yamaha Almarine Company (1997), Chief Executive in charge of Trade and Export for the John Holt Group in Nigeria and West Africa, and Executive Director in charge of Group Operations of John Holt Plc from 2003. In May 2005, he was appointed Group Managing Director/CEO of Odua Investment Company Limited, the investment vehicle of the five South-Western states in Nigeria, a position he held for nine years until his retirement in October 2014.',
      'Alhaji Adebayo Jimoh is a Fellow of the National Institute of Marketing of Nigeria and a member of the Institute of Directors. He currently chairs Synergy Cotton and Agro Allied Company, a cotton export business operated in partnership with Plexus Cotton, UK. He is also Chairman of University of Ibadan Bookshop Limited and Golden Age Universal Services Limited; Vice Chairman of the Federal University of Technology, Akure Advancement Board; National Vice Chairman of the Nigeria Chamber of Commerce, Industry, Mines and Agriculture (NACCIMA); and a Board Member of the National Orientation Agency, Abuja.',
      'He is widely travelled and has represented Nigerian business interests internationally across Europe, Asia, the Americas, Japan, the United Kingdom and Africa, and is a strong believer in team building, results and due process.',
    ],
  },
]

export const management: Leader[] = [
  {
    slug: 'martins-awofisayo',
    name: 'Martins A. Awofisayo',
    role: 'Managing Director / Chief Executive Officer',
    intro: 'Founded Harvestfield Industries in 2000 to market agrochemicals and public health products in Nigeria.',
    bio: [
      'Martins A. Awofisayo holds a 1984 Master’s degree in Business Analysis from the University of Lancaster, United Kingdom. He worked with the London office of the Nigerian Universities Office as Recruitment Manager from 1984 to 1987, during which he served as Secretary to the Recruitment Committee of the Committee of Vice-Chancellors of Nigerian Universities, responsible for recruiting foreign nationals as lecturers for Nigerian universities.',
      'He returned to Nigeria in 1987 and joined Continental Pharmaceuticals Limited, Lagos, as Operations Manager, rising to Deputy General Manager between 1997 and 2000. In the year 2000, he established Harvestfield Industries Limited to market agrochemicals and public health products in Nigeria.',
      'He currently serves as a Council Member of CropLife Nigeria and General Secretary of the Insecticide Treated Nets Association of Nigeria. He was Vice Chairman of the World Malaria Day Celebrations (2005–2015) of the Federal Ministry of Health, and is a member of the Development Partners Committee, comprising representatives of the WHO, UNICEF and DFID on the Roll Back Malaria Programme in Nigeria, an advisory body to the Federal Ministry of Health on malaria control.',
    ],
  },
  {
    slug: 'isaac-awofisayo',
    name: 'Isaac Awofisayo',
    role: 'Head of Strategy',
    intro: 'Former Barclays Relationship Director who leads Harvestfield’s strategy and is Managing Director of Harvestfield Healthcare FZE and Harvestfield FTZ.',
    bio: [
      'Isaac Awofisayo is an experienced corporate and investment banking professional with over a decade of experience spanning corporate banking, relationship management, credit and strategic business development across the healthcare and manufacturing sectors in Europe, the Middle East and Africa (EMEA). He currently serves as Head of Strategy at Harvestfield Industries Limited, where he supports the Company’s strategic direction, growth initiatives, business development activities and strategic partnerships.',
      'In addition to his role at Harvestfield Industries Limited, Isaac serves as Managing Director of Harvestfield Healthcare FZE, a healthcare manufacturing company focused on the local production of Long-Lasting Insecticidal Nets (LLINs) for malaria prevention. He also serves as Managing Director of Harvestfield FTZ. These leadership responsibilities complement his role at Harvestfield Industries Limited and provide additional experience across healthcare manufacturing, investment and enterprise development.',
      'Prior to joining Harvestfield Industries Limited, Isaac built his career in corporate and investment banking in the United Kingdom, including more than ten years with Barclays. As a Relationship Director at Barclays Corporate & Investment Bank, he managed complex credit portfolios and high-value strategic cross-border relationships, developing extensive experience in corporate finance, credit management, relationship management and the evaluation of complex business opportunities.',
      'Isaac attended the University of Surrey, United Kingdom, and has built professional experience across international banking, healthcare and manufacturing. His combination of financial and commercial experience provides a strong foundation for his role in supporting Harvestfield Industries Limited’s strategic growth, investment opportunities, partnerships and long-term business objectives.',
    ],
  },
  {
    slug: 'abdullahi-ndarubu',
    name: 'Dr Abdullahi Aliyu Ndarubu',
    credentials: 'Ph.D.',
    role: 'Chief Operating Officer',
    intro: 'Agronomist who led the setup of Harvestfield’s agrochemical formulation and Aflasafe manufacturing factories, and oversees both plants.',
    bio: [
      'Dr Abdullahi Aliyu Ndarubu graduated from the Federal University of Technology, Minna, in 1990 with a Bachelor of Technology (B.Tech), obtained a Master’s degree in Agronomy from Ahmadu Bello University, Zaria, in 1997, and a Ph.D. in Agronomy from the University of Ilorin in 2006. He completed the Senior Management Programme (SMP 28) at the Lagos Business School and attended an International Training on Pesticide Research and Development at the Hunan Research Institute of Chemical Industry, PR China, in 2012.',
      'He spent 15 years at the National Cereal Research Institute (NCRI), Badeggi, from 1992 to 2006, as Senior Research Fellow (Agronomy) and Head of the National Research Programme on Sesame. He worked extensively on rice, sesame, cowpea, sugarcane, pesticides technology and has over 20 scientific publications to his credit in international, local journals and proceedings.',
      'He joined The Candel Company Limited in May 2006, serving until February 2017 as General Manager (Research & Business Development) and later as General Manager (Technical & Regulatory Affairs). While with the Candel Company Ltd, he led the establishment of the Agrochemical formulation plant located within Lekki Free Zone Enterprise (The Candel FZE).',
      'Dr. Abdullahi is an EXCO member of the CropLife Nigeria (CLN), served as the General Secretary for over a decade and is currently serving as the Chairman of the Technical Committee. He is a Fellow of Weed Science Society of Nigeria (WSSN). He is a member of the several professional societies including the Nigeria Society for Plant Protection (NSPP), Mycotoxicological Society of Nigeria (MSN), Agricultural Society of Nigeria (ASN), Sugarcane Technologists Society of Nigeria (STSN) and Ecological Society of Nigeria (ECOSON). He is an associate of the Business Incubation Platform (BIP), IITA Ibadan and Facilitator of IITA/ROME Business School Nigeria Agribusiness based at IITA, Ibadan. He serves as industry-based supervisor to post-graduate student of department of Crop Protection and Environmental Biology, University of Ibadan.',
      'He joined Harvestfield Industries Limited in May 2017 as General Manager (Research & Development), and currently serve as the Chief Operating Officer. He led the establishment of the Harvestfield’s agrochemical formulation factory and the bio-control products (Aflasafe) manufacturing factory, with oversight supervisory role on both plants till date.',
    ],
  },
  {
    slug: 'adetayo-ogunfowoke',
    name: 'Adetayo Ogunfowoke',
    role: 'Head of Finance',
    intro: 'Chartered accountant (FCA) leading Harvestfield’s finance function, with experience across manufacturing, FMCG, energy and technology.',
    bio: [
      'Adetayo Ogunfowoke is a seasoned finance and strategic planning professional with extensive experience in financial planning and analysis, financial control, treasury management, corporate finance, business strategy, cost management and performance optimization across Nigeria’s manufacturing, FMCG, energy, technology and telecommunications sectors.',
      'He currently serves as Head of Finance at Harvestfield Industries Limited, where he provides leadership and oversight for the Company’s finance function and supports executive management in financial planning, performance management, financial control and strategic decision-making. In this capacity, he contributes to strengthening financial governance, improving operational efficiency, enhancing business performance and supporting the Company’s sustainable growth.',
      'Prior to his current role, Adetayo worked with Rite Foods Limited, where he gained valuable experience within the fast-moving consumer goods sector, further strengthening his expertise in financial planning, business performance analysis, management reporting, budgeting and strategic financial decision support.',
      'He also served as Financial Planning and Analysis Manager at Mouka Limited, where he contributed to financial forecasting, budgeting, financial performance analysis and performance optimization initiatives. His experience at Mouka further developed his ability to connect financial results with operational and commercial drivers and provide actionable insights to support management decision-making.',
      'Earlier in his career, Adetayo held finance and leadership positions at Wragby Business Solutions Limited, where he served as Financial Controller; CDK Industries Limited, where he worked as Cost Accountant; Sapele Power Plc, where he served as Finance Manager; Eurafric Oil and Coastal Limited, where he worked as Senior Accountant; Intercellular Nigeria Limited, where he served as Internal Auditor; and 21st Century Technologies, where he worked as Accountant.',
      'Across these roles, he developed broad expertise in financial reporting, management accounting, treasury management, internal controls, auditing, cost accounting, budgeting, forecasting, payroll management, financial analysis and operational finance. His experience across different industries has given him a strong understanding of the relationship between financial performance, operational efficiency, commercial strategy and sustainable business growth.',
      'Adetayo developed his audit and accounting foundation through his earlier career as an Audit Supervisor at Solomon Osunba & Co. and Olushile Fowora & Co. (Chartered Accountants). These roles provided him with strong technical foundations in auditing, accounting, taxation, internal controls and financial reporting, which subsequently supported his progression into corporate finance, FP&A and senior finance leadership.',
      'He holds a Bachelor of Science (B.Sc.) in Accounting from the University of Lagos and a Higher National Diploma (HND) in Accounting from Moshood Abiola Polytechnic, Abeokuta. He is a Fellow of the Institute of Chartered Accountants of Nigeria (FCA) and an Associate Accounting Technician (AAT). He completed the Leadership Excellence Programme at Lagos Business School, Pan-Atlantic University, further strengthening his leadership and strategic management capabilities.',
      'Adetayo’s professional expertise encompasses financial planning and analysis, budgeting and forecasting, financial modelling, management reporting, financial control, treasury management, cost and profitability analysis, corporate finance, internal controls, strategic planning and business performance management.',
      'As Head of Finance at Harvestfield Industries Limited, he brings together his extensive accounting, FP&A and financial leadership experience to strengthen financial management, support strategic planning, improve operational performance and create sustainable value for the Company and its stakeholders.',
    ],
  },
  {
    slug: 'aderonke-ajala',
    name: 'Aderonke Ifedolapo Ajala',
    credentials: 'FCIHRM, ACIPMN, CHRP',
    role: 'Human Resources Manager',
    intro: 'Training and HR professional with over two decades’ experience, leading talent and employee development at Harvestfield.',
    bio: [
      'Aderonke Ifedolapo Ajala is an accomplished Training and Human Resources professional with over two decades of extensive experience across administration, compliance management, regulatory standards, training operations, and organizational development. Currently serving as the Human Resources Manager at Harvestfield Industries Limited, Aderonke leads strategic talent initiatives, drives employee development, and ensures robust alignment with corporate standards and labour regulations.',
      'Throughout her distinguished career spanning more than 20 years, she has held progressive leadership roles across human resources management, administrative operations, and professional training supervision. Aderonke brings a strong, cross-functional track record in quality assurance, policy compliance, document control, root cause analysis, and strategic workforce management.',
    ],
  },
]
