import { BlogData } from "../components/BlogPost";

export const blogs: BlogData[] = [
  {
    slug: "backwashing-filter-cycles-municipal-industrial",
    title: "Backwashing 101: Setting filter cycles for reliable water treatment",
    seoTitle: "Backwashing Filter Cycles for Reliable Water Treatment",
    metaDescription:
      "Learn how to set backwashing filter cycles, DP setpoints, and SCADA logic for reliable municipal and industrial water treatment.",
    date: "September 14, 2026",
    category: "Water Treatment",
    heroImage:
      "https://pblol2.blob.core.windows.net/hiflux/catalogs/bg__2.jpeg",
    excerpt:
      "This guide explains how backwashing works in media and screen filters and why correct cycle control is critical for municipal and industrial water treatment. It covers DP-based triggers, cycle duration, rinse steps, and SCADA integration, with starting setpoints and troubleshooting tips to avoid over- and under-backwashing while protecting membranes and extending filter life.",
    tags: [
      "Filtration System",
      "Water Treatment Solutions",
      "Industrial Filtration Systems",
      "Backwashing Filters",
    ],
    sections: [
      {
        heading: null,
        body: `Backwashing keeps granular and screen-based filters working to spec. Get the cycle wrong and you lose capacity, foul downstream equipment, or waste water and energy. Get it right and you stabilise differential pressure, hold turbidity targets, and extend media and element life.\nThis guide explains what backwashing is, what a backwashing sediment filter does, and how to set why, when, and how long for municipal and industrial duties. It closes with practical starting points, DP setpoints, SCADA integration tips, and how HiFlux designs simplify cycle control with low-maintenance hardware and certification support.\nZero margin for error. Consistent results. That is the objective.`,
      },
      {
        heading: "What backwashing is and what it does",
        body: `Backwashing reverses flow through a filter to dislodge and remove trapped solids. It is used with:\n• Granular media filters (sand, anthracite, multimedia)\n• Automatic screen filters\n• Nozzle and lateral beds feeding clarifiers, RO pre-treatment, and process water\nA backwashing sediment filter accumulates suspended solids during service. When DP rises or a timer expires, the filter reverses or reconfigures flow to fluidise media or shear the screen, exporting the solids to drain. Correct shear and velocity are essential to lift the bed, break the cake layer, and avoid media loss.`,
      },
      {
        heading: "Why cycles matter",
        body: `Cycle control safeguards throughput, quality, and asset life. The goals are simple:\n• Maintain a stable operating DP and flow\n• Protect downstream membranes and exchangers\n• Minimise water and energy used for cleaning\n• Avoid bed channeling and biological growth\nOver-backwashing wastes water and can destabilise a media bed. Under-backwashing allows fines breakthrough, higher turbidity, membrane fouling, and accelerated pump wear.`,
      },
      {
        heading: "When to backwash, and which trigger to use",
        body: `For municipal and industrial filtration, DP-driven logic is the most reliable primary trigger, with time and quality interlocks as secondary checks.\nTypical triggers:\n• Differential pressure (primary): Start at a defined DP rise across the filter.\n• Time (secondary): Force a clean if the DP trigger does not occur within a maximum service interval, useful on variable or low-load streams.\n• Quality override: Start if turbidity or particle count spikes above a limit.\n• Flow-conditional: Only allow a cycle when bypass or duty-standby capacity is available.\nRecommended starting DP setpoints:\n• Clean DP reference: establish after media conditioning or element change, at design flow and temperature.\n• Start backwash: clean DP + 0.5 to 1.0 bar for media beds handling typical surface water or pre-RO duties.\n• Alarm review: clean DP + 1.5 to 2.0 bar if a cycle fails to recover pressure.\nAdjust for viscosity, temperature, and solids character. Heavier, sticky solids may need a lower DP threshold to avoid compaction.`,
      },
      {
        heading: "How long to backwash",
        body: `Cycle time must deliver target bed expansion or screen shear for long enough to flush the cake. Use manufacturer data where available. As practical starting points:\nMedia filters (sand/multimedia)\n• Backwash flow: set per media spec to achieve 15 to 30 percent bed expansion at operating temperature. Colder water needs higher flow for the same expansion.\n• Duration: 6 to 10 minutes for typical municipal and light industrial loads. High-load or oily solids can require 10 to 15 minutes.\n• Rinse/settle: 2 to 5 minutes rinse to drain at service flow before returning to line, confirming turbidity is back within target.\nAutomatic screen filters\n• Scour duration: 20 to 60 seconds per cycle for mechanically assisted screens, depending on mesh size and solids load.\n• Repeat cycles: 1 to 3 quick cycles if DP does not return close to clean DP.\n• Return-to-service check: confirm DP recovery within 10 to 20 percent of clean DP.\nThese are starting points only. Validate on your plant with DP, turbidity, and particle data. Increase time in small increments and verify the recovery curve.`,
      },
      {
        heading: "Can you backwash too much",
        body: `Yes. Over-backwashing:\n• Wastes water and energy\n• Depletes media and can cause media carryover\n• Disturbs biological filters that rely on a stable biofilm\n• Increases wear on actuated valves and drives\nIf your DP returns well below clean DP, your cycle is likely longer or stronger than required. Trim duration or flow and trend results.`,
      },
      {
        heading: "Risks of under-backwashing",
        body: `Under-cleaning is costlier than it looks:\n• Persistent high DP, higher pump energy\n• Bed channeling and solids breakthrough\n• Rapid fouling of RO elements and heat exchangers\n• Shorter media and element life\nIf DP fails to recover to within 10 to 20 percent of clean DP after a cycle, increase duration or flow, or shorten the service interval. Inspect internals if deterioration continues.`,
      },
      {
        heading: "SCADA integration tips",
        body: `Reliable automation requires clean signals and safe interlocks:\n• Use DP transmitters with proper range and damping. Validate zero and span after each maintenance shutdown.\n• Program primary DP trigger with minimum service time lockout to prevent cycling.\n• Add maximum DP and maximum time overrides to force a cycle.\n• Interlock against critical process steps, or switch to standby duty via duplex or duty-standby logic before starting a cycle.\n• Log clean DP, pre-cycle DP, post-cycle DP, duration, flow, and total backwash water. Trend recovery percentage and water used per cycle to refine setpoints.\n• Expose manual start and manual inhibit under permit control for maintenance.`,
      },
      {
        heading: "How HiFlux simplifies cycle control",
        body: `HiFlux industrial filtration systems are engineered for predictable DP recovery and low operator input. Designs focus on:\n• Consistent bed and screen hydraulics for repeatable cleaning\n• Robust actuation and seals for frequent cycling\n• Minimal maintenance access with safe isolation\n• Full documentation, material traceability, and certification support for regulated sites\nFor solids that resist hydraulic cleaning, pairing with an upstream magnetic filter can reduce load on the primary filter and cut backwash frequency. See our range of inline magnetic filters for ferrous capture in recirculating loops and process water.\nIf you are integrating RO, consistent pre-filter control protects membranes. Explore our reverse osmosis solutions, including guidance on selecting the right water system filter and RO filter for industrial duty.\n• Learn more about our industrial filtration systems and engineering support at our filtration system overview: https://www.hiflux.uk.com/industrial-filtration-systems\n• Reduce ferrous load ahead of fine filtration with an inline magnetic filter: https://www.hiflux.uk.com/magnetic-filters\n• Plan RO pre-treatment and protection, including filters for reverse osmosis and reverse osmosis system manufacturers guidance: https://www.hiflux.uk.com/reverse-osmosis-water-filtration`,
      },
      {
        heading: "Practical commissioning checklist",
        body: `Use this as a starting framework, then tune to site data:\n• Establish clean DP at design flow and temperature.\n• Set start DP at clean DP + 0.5 to 1.0 bar, with a maximum time override.\n• Set backwash duration to deliver target bed expansion or screen scour, then add a short rinse-to-drain.\n• Trend recovery: target post-cycle DP within 10 to 20 percent of clean DP.\n• Review water use per cycle and adjust to the minimum effective duration.\n• Add seasonal adjustments for water temperature and solids character.`,
      },
      {
        heading: "Summary",
        body: `Backwashing is routine, but performance hinges on data-led control. Use DP as the primary trigger, validate with quality signals, and set the minimum effective duration that restores DP. Protect throughput, protect membranes, and cut lifecycle cost. HiFlux designs make cycle control predictable, maintenance light, and compliance straightforward. If you want help selecting or commissioning an industrial filtration solution, contact us. We will specify, document, and support the system so your plant runs clean and stays that way.`,
      },
    ],
    faq: [
      {
        q: "What is backwashing of filters?",
        a: "It is reversing or reconfiguring flow through a filter to dislodge trapped solids and flush them to drain.",
      },
      {
        q: "What does a backwashing sediment filter do?",
        a: "It captures suspended solids in service, then automatically cleans itself by reversing flow so capacity and low DP are restored.",
      },
      {
        q: "How often should I backwash a filter?",
        a: "Start with DP-based control at clean DP + 0.5 to 1.0 bar, with a maximum service interval as a safety net. Frequency will vary with solids load.",
      },
      {
        q: "How long should I backwash a filter for?",
        a: "As a starting point, media beds 6 to 10 minutes plus 2 to 5 minutes rinse; screen filters 20 to 60 seconds per scour, repeating if DP does not recover. Tune on site.",
      },
      {
        q: "Can you backwash a filter too much?",
        a: "Yes. Over-backwashing wastes water, erodes media, and wears components. Set the minimum effective duration that restores DP.",
      },
      {
        q: "Do you always rinse after backwash?",
        a: "Yes for media filters. A short rinse returns turbidity to target before service. Screen units typically return directly once DP recovers, but verify quality limits.",
      },
    ],
    cta: {
      heading: "Selecting or commissioning an industrial filtration system?",
      body: "Tell us your solids load, flow and quality targets. We'll specify, document, and support the system so your plant runs clean and stays that way.",
      email: "sales@hiflux.uk.com",
      phone: "+44 7369 243459",
    },
  },
  {
    slug: "hiflux-joins-hydrogen-energy-association-distributors",
    title:
      "Hiflux Joins the Hydrogen Energy Association and Seeks New Distributors",
    date: "August 3, 2026",
    category: "Industry News",
    heroImage:
      "https://pblol2.blob.core.windows.net/hiflux/catalogs/bg__2.jpeg",
    excerpt:
      "Hiflux has joined the Hydrogen Energy Association, strengthening its commitment to supporting the development of safe, reliable and high-performance hydrogen infrastructure.",
    tags: [
      "Hydrogen",
      "High Pressure",
      "Hydrogen Energy Association",
      "Distributors",
      "HIFLUX",
    ],
    sections: [
      {
        heading: "Supporting High-Pressure Hydrogen Systems",
        body: `The Hydrogen Energy Association represents organisations from across the hydrogen value chain, bringing industry expertise together to encourage collaboration, support innovation and help advance the UK hydrogen sector.\n\nFor Hiflux, joining the association reflects an established focus on developing high-pressure flow-control products for demanding hydrogen applications.\n\nHydrogen presents several engineering challenges due to its small molecular size, demanding operating pressures and the need for dependable leak control. Every valve, fitting and tube within a hydrogen system must therefore be carefully selected to support safety, pressure integrity and reliable operation.\n\nHiflux UK supplies high-pressure valves, fittings, tubing and associated components for industrial applications, with products available for systems operating at pressures of up to 150,000 psi. The range also includes specialist piping components for hydrogen refuelling stations and hydrogen-powered vehicles.`,
      },
      {
        heading: "At a Glance",
        body: `• Association — Hydrogen Energy Association.\n• Max working pressure — up to 150,000 psi.\n• Refuelling valve rating — 700 bar.\n• Applications — production, storage, distribution, refuelling, end use.`,
      },
      {
        heading: "Hydrogen Product Range",
        body: `• Hydrogen needle valves.\n• High-pressure check valves.\n• Tube fittings and adapters.\n• High-pressure tubing.\n• Flow-control components.\n• Hydrogen refuelling system accessories.\n\nHiflux's hydrogen refuelling needle valve is designed for pressures of up to 700 bar and made in STS316 stainless steel for the corrosion resistance required in high-pressure environments. The valve also incorporates a non-rotating stem, reliable packing, metal-to-metal seating and a design developed specifically for use with hydrogen.`,
      },
      {
        heading: "Collaboration Across the Hydrogen Industry",
        body: `Membership of the Hydrogen Energy Association gives Hiflux the opportunity to engage with organisations involved in hydrogen production, storage, distribution, refuelling and end-use applications.\n\nThrough greater industry collaboration, Hiflux can contribute its experience in high-pressure valve and fitting technology while remaining closely connected to the technical and commercial developments shaping the hydrogen market.\n\nThe association provides a platform for members to exchange knowledge, participate in industry discussions and collectively support the continued growth of hydrogen applications in the UK.`,
      },
      {
        heading: "Featured Hydrogen Products",
        body: `• High Pressure Needle Valve — straight type, 316CW 3/8", MAWP 20,000 psig.\n• High Pressure Elbow Fitting — 316CW 3/8" × 9/16" elbow, MAWP 60,000 psig.\n• High Pressure Tubing — stainless tubing for ultra-high-pressure hydrogen lines.`,
      },
      {
        heading: "Engineering Components for the Hydrogen Economy",
        body: `As hydrogen infrastructure continues to develop, reliable pressure-control equipment will remain critical. Valves and fittings must operate safely under demanding pressure conditions while helping system designers minimise leakage risks and maintain efficient flow control.\n\nHiflux continues to invest in the research and development of hydrogen-compatible components, including specialist valves and fittings for refuelling infrastructure. Its experience in ultra-high-pressure engineering provides a strong technical foundation for supporting hydrogen projects across transport, industrial processing, energy and research applications.\n\nJoining the Hydrogen Energy Association represents another step in Hiflux's ongoing contribution to the hydrogen sector — combining specialist engineering knowledge with greater collaboration across the industry.`,
      },
      {
        heading: "Expanding the Hiflux Distributor Network",
        body: `Alongside its work within the hydrogen sector, Hiflux is looking to expand its distributor network and build relationships with experienced companies that can represent its high-pressure product range in their local markets.\n\nDistributors can offer customers local access to Hiflux valves, fittings, tubing and hydrogen-compatible components while helping engineers identify suitable products for specific pressure, connection and flow-control requirements. Hiflux is seeking long-term partnerships with organisations that value technical knowledge, responsive customer support and reliable high-pressure solutions.`,
      },
      {
        heading: "Key Figures",
        body: `• 150,000 psi — built for extreme pressure. Products for the most demanding hydrogen applications.\n• 700 bar — refuelling ready. Needle valves developed specifically for hydrogen refuelling.\n• STS316 — precision engineering. Corrosion resistance and long-term performance under pressure.\n• HEA — stronger together. Membership reflects our commitment to the hydrogen economy.`,
      },
      {
        heading: "Discover Hiflux Hydrogen Products",
        body: `Hiflux offers a dedicated range of hydrogen valves, fittings and high-pressure components developed for demanding hydrogen systems.\n\nExplore the Hiflux hydrogen product range or contact the team to discuss the pressure, connection and flow-control requirements of your application.`,
      },
    ],
    cta: {
      heading: "Tell Hiflux the pressure, media and connection requirements.",
      body: "We'll help identify the right Hiflux high-pressure solution.",
      email: "sales@hiflux.uk.com",
      phone: "+44 7369 243459",
    },
  },
  {
    slug: "high-pressure-check-valves-reverse-flow-prevention",
    title:
      "High-Pressure Check Valves: Preventing Reverse Flow in Critical Systems",
    date: "July 24, 2026",
    category: "Check Valves",
    heroImage: "https://pblol2.blob.core.windows.net/hiflux/blog-1.jpeg",
    excerpt:
      "In high-pressure gas and liquid systems, controlling the direction of flow is essential. A high-pressure check valve allows media to move in one direction while restricting flow in the opposite direction. HIFLUX offers O-ring and ball-type designs across multiple tube sizes, with pressure ratings reaching 100,000 psi.",
    tags: [
      "Check Valves",
      "High Pressure",
      "Non-Return Valve",
      "Stainless Steel 316",
      "HIFLUX",
    ],
    sections: [
      {
        heading: "What Is a High-Pressure Check Valve?",
        body: `A check valve is a direction-sensitive valve that operates automatically. During normal forward flow, system pressure moves the internal sealing element away from its seat, allowing gas or liquid to pass through the valve. If the pressure direction changes, the sealing element returns towards the seat and blocks the reverse flow path.\n\nAccording to the HIFLUX catalogue, the check-valve range is designed to block flow in one direction, allow flow in the intended direction, prevent the backflow of gas or liquid and support one-way media transfer. Correct installation orientation is therefore essential.`,
      },
      {
        heading: "Why Reverse-Flow Prevention Matters",
        body: `Reverse flow can develop because of pressure loss, pump shutdown, compressor cycling or pressure differences between connected sections of a system. Without a suitable non-return valve, reverse flow may lead to:\n\n• Unwanted pressure transfer from downstream sections into upstream pipework or equipment.\n• Process instability in systems designed around one-directional flow.\n• Equipment disruption affecting pumps, compressors, regulators or instruments.\n• Cross-contamination where different gases or liquids are used in connected system sections.\n\nA correctly selected high-pressure check valve helps maintain the intended flow direction and supports the stability of the wider high-pressure system.`,
      },
      {
        heading: "HIFLUX High-Pressure Check-Valve Range",
        body: `HIFLUX classifies its check valves according to pressure rating, tube size and sealing type:\n\n• 10,000 psi — 1/2" — O-ring and ball type available.\n• 15,000 psi — 1/8", 1/4", 3/8" — O-ring and ball type available.\n• 20,000 psi — 1/4", 3/8", 9/16", 3/4", 1" — O-ring and ball type available.\n• 30,000 psi — 1/8", 1" — O-ring and ball type available.\n• 60,000 psi — 1/4", 3/8", 9/16" — O-ring and ball type available.\n• 100,000 psi — 1/4", 3/8" — ball type only, no O-ring option.\n\nThe catalogue specifically states that the 100,000 psi check-valve range is not available in an O-ring configuration. These models are listed only as ball-type check valves.`,
      },
      {
        heading: "O-Ring-Type and Ball-Type Check Valves",
        body: `The HIFLUX catalogue identifies two principal sealing arrangements. Both are intended to prevent reverse flow, but they use different internal sealing elements.\n\n• O-ring type: sealing element is an O-ring, maximum catalogue pressure 60,000 psi, O-ring is the replaceable component, not available at 100,000 psi. Main selection consideration is seal and media compatibility.\n• Ball type: sealing element is an internal ball, maximum catalogue pressure 100,000 psi, ball is the replaceable component, available at 100,000 psi. Main selection consideration is higher-pressure model availability.`,
      },
      {
        heading: "O-Ring-Type Check Valves",
        body: `The O-ring design uses an elastomeric sealing element to help restrict reverse flow. HIFLUX lists O-ring-type check valves at selected pressure ratings from 10,000 psi to 60,000 psi and identifies easy O-ring replacement as a product feature.\n\nThe specific O-ring material and operating-temperature range are not stated in the check-valve section of the catalogue. These points should therefore be confirmed before specifying a valve for a particular gas, chemical or temperature condition.`,
      },
      {
        heading: "Ball-Type Check Valves",
        body: `The ball-type design uses an internal ball as the sealing element. During forward flow, the ball moves away from its sealing position. If flow begins to reverse, the ball returns towards the seat and restricts the reverse path.\n\nHIFLUX lists ball-type check valves at 10,000, 15,000, 20,000, 30,000, 60,000 and 100,000 psi. The ball-type configuration is the only sealing arrangement shown for the 100,000 psi models.`,
      },
      {
        heading: "Selected HIFLUX Check-Valve Specifications",
        body: `• CV15OS02 — 15,000 psi — 1/8" tube — 1.4 mm orifice — O-ring.\n• CV15BS04 — 15,000 psi — 1/4" tube — 3.2 mm orifice — Ball.\n• CV20OS06 — 20,000 psi — 3/8" tube — 5.2 mm orifice — O-ring.\n• CV20BS12 — 20,000 psi — 3/4" tube — 11.1 mm orifice — Ball.\n• CV60OS04 — 60,000 psi — 1/4" tube — 2.4 mm orifice — O-ring.\n• CV60BS09 — 60,000 psi — 9/16" tube — 4.8 mm orifice — Ball.\n• CV100BS04 — 100,000 psi — 1/4" tube — 2.4 mm orifice — Ball.\n• CV100BS06 — 100,000 psi — 3/8" tube — 2.4 mm orifice — Ball.\n\nThe catalogue notes that all listed dimensions are for reference and may differ from the final manufactured product.`,
      },
      {
        heading: "15,000 psi Check Valves",
        body: `The 15,000 psi range includes O-ring and ball-type models in 1/8, 1/4 and 3/8-inch tube sizes:\n\n• CV15OS02 / CV15BS02 — 1/8" tube — port H1502 — 1.4 mm orifice.\n• CV15OS04 / CV15BS04 — 1/4" tube — port H1504 — 3.2 mm orifice.\n• CV15OS06 / CV15BS06 — 3/8" tube — port H1506 — 5 mm orifice.`,
      },
      {
        heading: "20,000 psi Check Valves",
        body: `The 20,000 psi range covers tube sizes from 1/4 inch to 1 inch:\n\n• CV20OS04 / CV20BS04 — 1/4" tube — port H2004 — 2.8 mm orifice.\n• CV20OS06 / CV20BS06 — 3/8" tube — port H2006 — 5.2 mm orifice.\n• CV20OS09 / CV20BS09 — 9/16" tube — port H2009 — 5 mm orifice.\n• CV20OS12 / CV20BS12 — 3/4" tube — port H2012 — 11.1 mm orifice.\n• CV20OS16 / CV20BS16 — 1" tube — port H2016 — 7 mm orifice.\n\nThe available orifice sizes differ across the range, so engineers should consider both the nominal tube size and the internal flow passage.`,
      },
      {
        heading: "60,000 psi Check Valves",
        body: `For higher-pressure service, HIFLUX lists O-ring and ball-type check valves in 1/4, 3/8 and 9/16-inch tube sizes:\n\n• CV60OS04 / CV60BS04 — 1/4" tube — port H6004 — 2.4 mm orifice.\n• CV60OS06 / CV60BS06 — 3/8" tube — port H6006 — 3.2 mm orifice.\n• CV60OS09 / CV60BS09 — 9/16" tube — port H6009 — 4.8 mm orifice.`,
      },
      {
        heading: "100,000 psi Ultra-High-Pressure Check Valves",
        body: `The HIFLUX ultra-high-pressure check-valve range includes two 100,000 psi ball-type models:\n\n• CV100BS04 — port H10004 — 1/4" tube — 2.4 mm orifice — 103.1 mm overall length.\n• CV100BS06 — port H10006 — 3/8" tube — 2.4 mm orifice — 114.5 mm overall length.`,
      },
      {
        heading: "Stainless Steel 316 Construction",
        body: `HIFLUX states that its high-pressure check valves use cold-worked Stainless Steel 316, presented in the catalogue as providing the corrosion resistance required for high-pressure service.\n\nMaterial suitability should still be assessed against the exact gas or liquid, chemical concentration, system temperature, external environment and pressure conditions. Stainless Steel 316 construction does not mean that the valve is automatically compatible with every process medium.`,
      },
      {
        heading: "Cone-and-Thread Connections",
        body: `The HIFLUX range uses a cone-and-thread connection intended to help prevent gas and liquid leakage. In this type of connection, the prepared tube end forms the sealing interface while threaded components secure the connection.\n\nCorrect tube preparation and assembly are important because connection integrity depends on the complete installation, not only the valve body. The valve, tubing, fittings and adapters should all have compatible pressure ratings and connection dimensions.`,
      },
      {
        heading: "Key Product Features",
        body: `• One-way operation — helps prevent reverse flow of gas or liquid.\n• O-ring and ball sealing options — provides different sealing configurations.\n• Pressure ratings up to 100,000 psi — supports selected ultra-high-pressure systems.\n• Cold-worked Stainless Steel 316 construction — provides corrosion resistance for high-pressure service.\n• Cone-and-thread connection — intended to reduce gas or liquid leakage.\n• Replaceable O-ring and ball — supports maintenance and internal component replacement.\n• Multiple tube and port sizes — allows selection around the piping arrangement.`,
      },
      {
        heading: "Selecting the Correct High-Pressure Check Valve",
        body: `A valve should not be selected from pressure rating alone. Several factors need to be reviewed together:\n\n• Pressure rating — what is the maximum pressure the valve may experience?\n• Medium — will the valve handle gas, liquid or both?\n• Sealing type — is an O-ring or ball configuration required?\n• Tube size — does the valve match the connected tubing?\n• Port type — is the HIFLUX port designation compatible with the system?\n• Orifice size — can the internal passage support the required flow?\n• Material compatibility — is Stainless Steel 316 suitable for the process medium?\n• Flow direction — can the valve be installed according to its marked direction?\n• Maintenance access — can the valve be safely isolated and depressurised?`,
      },
      {
        heading: "Pressure Rating",
        body: `The pressure rating must be suitable for the system's operating conditions. The HIFLUX range covers several pressure classes, but not every tube size or sealing type is available at every pressure.\n\n• 1/4 and 3/8-inch models at 100,000 psi.\n• 1/4, 3/8 and 9/16-inch models at 60,000 psi.\n• A wider range from 1/4 to 1 inch at 20,000 psi.`,
      },
      {
        heading: "Gas or Liquid Service",
        body: `HIFLUX states that the check valves can be used with both gas and liquid. The specific medium must still be reviewed against the body material, internal sealing components, pressure, temperature and required leakage performance.`,
      },
      {
        heading: "Orifice Size and Flow Passage",
        body: `The catalogue gives an orifice size for each check-valve model. A larger tube connection does not always mean the same internal orifice size.\n\n• The 20,000 psi 3/4-inch model has an 11.1 mm orifice.\n• The 20,000 psi 1-inch model has a 7 mm orifice.\n• Both 100,000 psi models have a 2.4 mm orifice.`,
      },
      {
        heading: "Installation Direction",
        body: `The valve must be installed according to the flow arrow marked on the body. Installation planning should also consider accessibility, tube alignment, space for removal, isolation before maintenance and safe system depressurisation.`,
      },
      {
        heading: "Replaceable Sealing Components",
        body: `The HIFLUX catalogue identifies easy O-ring and ball replacement as a product feature. Replacement work should only take place after the system has been:\n\n• Isolated.\n• Fully depressurised.\n• Confirmed safe for maintenance.\n• Cleaned where required for the process medium.`,
      },
      {
        heading: "Check Valve or Line Filter?",
        body: `The same HIFLUX catalogue section includes high-pressure line filters. Although the products may have a similar external format, they perform different functions.\n\n• High-pressure check valve — prevents reverse flow — O-ring or ball type.\n• High-pressure line filter — captures particles in the media — cup-type element.\n• A system using both — provides directional control and filtration — separate valve and filter components.\n\nHIFLUX lists cup-type filter elements with filtration options ranging from approximately 2 to 90 micrometres. A filter is not a substitute for a check valve. Where a system requires both contamination control and reverse-flow prevention, both components may be needed.`,
      },
      {
        heading: "Applications for High-Pressure Check Valves",
        body: `Based on their stated function and pressure range, HIFLUX check valves may be considered for high-pressure gas and liquid systems requiring one-way flow, including:\n\n• High-pressure piping assemblies.\n• Pressure-testing equipment.\n• Gas-handling systems.\n• Hydraulic equipment.\n• Pump and intensifier systems.\n• Research equipment.\n• Chemical and process systems.\n• Oil and gas equipment.\n• Ultra-high-pressure installations.\n\nApplication suitability must be determined from the actual process conditions and the selected catalogue model.`,
      },
      {
        heading: "Supporting Reliable One-Way Flow",
        body: `A high-pressure check valve may be compact, but its role within the system is important. By restricting reverse flow, it helps maintain the intended movement of gas or liquid and reduces the possibility of unwanted pressure transfer between system sections.\n\nThe HIFLUX range includes O-ring and ball-type sealing arrangements, pressure ratings from 10,000 to 100,000 psi, tube sizes from 1/8 to 1 inch across selected ranges, cold-worked Stainless Steel 316 construction, cone-and-thread connections and replaceable O-ring and ball components.\n\nFor critical high-pressure systems, the correct non-return valve supports more than basic reverse-flow prevention. It contributes to controlled media movement and the reliable operation of the complete pressure system.`,
      },
    ],
    cta: {
      heading: "Need help specifying a check valve?",
      body: "Get in touch with our team to discuss pressure ratings, sealing types and tube sizes for your application.",
      email: "sales@hiflux.uk.com",
      phone: "+44 7369 243459",
    },
  },
];
