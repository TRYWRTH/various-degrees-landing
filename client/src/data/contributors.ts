export type Contributor = {
  slug: string;
  name: string;
  /** Optional discipline label, shown above the name in the panel when set. */
  discipline?: string;
  bio: string;
  /** Instagram or personal site, shown as a link under the name in the panel. */
  link?: { href: string; label: string };
};

/** In alphabetical order by first name. */
export const contributors: Contributor[] = [
  {
    slug: "andrea-mikyska",
    name: "Andrea Mikyska",
    link: { href: "https://www.instagram.com/miu_._._._/", label: "@miu_._._._" },
    bio: "Andrea Mikyska is a new media artist, exploring the meeting of nature, tech and constant change. Her primary focus lies on the connection of technology, nature, and constant mutational practice she refers to as \"reverse archaeology\"; a method of reconsidering current forms to discover new perceptions.",
  },
  {
    slug: "asmaa-azaizeh",
    name: "Asmaa Azaizeh",
    link: { href: "https://www.asmaa-azaizeh.com/", label: "asmaa-azaizeh.com" },
    bio: "Asmaa Azaizeh is a poet, writer, and editor. She is an author of four poetry collections. In 2010 she received the Debutant Writer Award from Al Qattan Foundation for her volume of poetry “Liwa”, (2011, Alahlia). Her 2018 collection, “Don’t Believe me if I talk of war” (Al-Mutawaset, 2018) was translated into Dutch and Swedish and an audio-visual performance based on it premiered at the official selection at the Avignon theatre festival in 2022. Her first memoir “A Year of Small Museums” was recently published by Rewayat, UAE.",
  },
  {
    slug: "julio-clavijo",
    name: "Julio Clavijo",
    link: { href: "https://www.instagram.com/11v151131_m06/", label: "@11v151131_m06" },
    bio: "Julio Clavijo, also known as 11v151131_M06 (invisible mob), uses AI and generative algorithms to create images that become windows into a parallel reality. Drawing inspiration from ritualistic practices around the world, Clavijo delves into the depths of imaginary narratives and timelines. Using custom image data sets and machine learning techniques, he blurs the boundaries between what is authentic and what is constructed. The convergence of rituals, ancient artefacts, and digital interventions creates a visual dialogue in reflection of our relationship with the future and the past.",
  },
  {
    slug: "kevin-junk",
    name: "Kevin Junk",
    link: { href: "https://www.instagram.com/lupodoro/", label: "@lupodoro" },
    bio: "Kevin Junk (he/they), born 1989, is a poet, novelist and writer based in Berlin. His work has been published in German and internationally. Junk is interested in the intersection of queerness, class, and climate. His poetry collection „RE: re: AW: Liebe“ came out in 2022 with Verlagshaus Berlin. He’s the recipient of a research grant by the Senate of Berlin for his second novel „Saturns Sommer“, published in 2023. Junk lives and works in Berlin.",
  },
  {
    slug: "nicola-sebastian",
    name: "Nicola Sebastian",
    link: { href: "https://www.instagram.com/nicolaseabass/", label: "@nicolaseabass" },
    bio: "Nicola Sebastian is a Filipino writer, surfer and National Geographic Explorer, exploring “islandness” as both a space and sensibility in her work. Her work has been published in Orion Magazine, Atmos, Vogue, and The Virginia Quarterly Review. She is the co-founder of Emerging Islands, an arts-for-ecology collective that brings together artists, environmentalists, and grassroots communities to co-create and decolonise stories of the Philippine islands.",
  },
  {
    slug: "sharlene-durfey-francois",
    name: "Sharlene Durfey François",
    link: { href: "https://www.instagram.com/shhhroooms/", label: "@shhhroooms" },
    bio: "Sharlene Durfey is a multidisciplinary artist, connector, and mushroom lover based in Berlin. With a practice that centers around fungi, Durfey views mushrooms as powerful teachers that decompose, connect, and communicate. Through her art, she aims to reveal their beauty, weirdness, and ecological importance while creating a bridge between people and the natural world.",
  },
  {
    slug: "theresa-weber",
    name: "Theresa Weber",
    link: { href: "https://www.instagram.com/therrytail/", label: "@therrytail" },
    bio: "Theresa Weber is an artist, currently living and working in Berlin. Through material collage, textile installation and collaborative performance, the artist seeks to question existing power hierarchies and fixed categorizations. From her perspective as an artist with Jamaican, German and Greek background, her practice often refers to Caribbean discourse, ancient mythologies and historical research. Represented through contemporary body-marks and archival techniques, her practice exemplifies the constant transformation within every tradition. On the dynamic field between transparency and opacity, Weber’s practice creates space for strength and resilience, through nuance and fragility.",
  },
  {
    slug: "tomer-rosenthal",
    name: "Tomer Rosenthal",
    link: { href: "https://www.instagram.com/tomerrrosenthal/", label: "@tomerrrosenthal" },
    bio: "Tomer Rosenthal (b. 1987, Jerusalem) is an artist currently living and working in Berlin. Tomer Rosenthal’s drawings are rooted in an idiosyncratic cosmology of images, placing ancient symbols with contemporary imagery to transgress cultural and temporal boundaries. His work has been shown in exhibitions across Israel-Palestine and Europe, including the Tel Aviv Museum of Art, Traces: The Biennale for Drawing (Jerusalem), Eigen+Art Lab (Berlin), Art+Text Budapest, and Galeria Sabot (Cluj-Napoca).",
  },
];
