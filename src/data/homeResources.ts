export type InspirationItem = {
  title: string;
  creator: string;
  year?: string;
  note: string;
  tags: string[];
  trailerVideoId?: string;
  trailerLabel?: string;
  coverUrl?: string;
};

export type InspirationSection = {
  title: string;
  icon: string;
  androidIcon: string;
  items: InspirationItem[];
};

export const inspirationSections: InspirationSection[] = [
  {
    title: 'Movies', icon: 'film.fill', androidIcon: 'movie', items: [
      { title: 'On the Basis of Sex', creator: 'Mimi Leder', year: '2018', note: 'Ruth Bader Ginsburg’s early career shows how legal strategy, partnership, and persistence can reshape entrenched rules.', tags: ['Biography', 'Equality'], trailerVideoId: '28dHbIR_NB4' },
      { title: 'Marshall', creator: 'Reginald Hudlin', year: '2017', note: 'A young Thurgood Marshall navigates a difficult trial while building the courtroom instincts that defined his career.', tags: ['Trial work', 'Civil rights'], trailerVideoId: 'AxldHmhSYhU' },
      { title: 'Just Mercy', creator: 'Destin Daniel Cretton', year: '2019', note: 'A grounded portrait of Bryan Stevenson’s early advocacy and the patience required for public-interest law.', tags: ['Public interest', 'Resilience'], trailerVideoId: 'GVQbeG5yW78' },
      { title: 'The Paper Chase', creator: 'James Bridges', year: '1973', note: 'A classic—if dated—look at 1L pressure, the Socratic classroom, study groups, and learning how to think differently.', tags: ['Law school', '1L life'], trailerVideoId: 'wGUfvZU4wiE' },
      { title: 'A Civil Action', creator: 'Steven Zaillian', year: '1998', note: 'A cautionary story about litigation risk, client responsibility, obsession, and the human cost behind a case.', tags: ['Litigation', 'Ethics'], trailerVideoId: 'Y4WOo8IJzVg' },
      { title: 'Erin Brockovich', creator: 'Steven Soderbergh', year: '2000', note: 'A reminder that careful listening, relentless fact gathering, and empathy can be as important as credentials.', tags: ['Advocacy', 'Investigation'], trailerVideoId: 'KnMoELYjpo4' },
      { title: 'Philadelphia', creator: 'Jonathan Demme', year: '1993', note: 'A moving study of dignity, bias, client trust, and the personal stakes of employment and civil-rights litigation.', tags: ['Civil rights', 'Client care'], trailerVideoId: 'n6nWVYcj9R8' },
      { title: 'The Trial of the Chicago 7', creator: 'Aaron Sorkin', year: '2020', note: 'A dramatized courtroom story about protest, procedure, advocacy, and the tension between law and politics.', tags: ['Courtroom', 'History'], trailerVideoId: 'FVb6EdKDBfU' },
      { title: 'Dark Waters', creator: 'Todd Haynes', year: '2019', note: 'Long-form environmental litigation tests one lawyer’s stamina, relationships, and sense of professional duty.', tags: ['Environmental law', 'Persistence'], trailerVideoId: 'RvAOuhyunhY' },
      { title: 'Legally Blonde', creator: 'Robert Luketic', year: '2001', note: 'A buoyant story about belonging, rejecting stereotypes, finding a personal learning style, and trusting your preparation.', tags: ['Law school', 'Confidence'], trailerVideoId: 'vWOHwI_FgAo' },
    ],
  },
  {
    title: 'TV shows', icon: 'tv.fill', androidIcon: 'live_tv', items: [
      { title: 'The Good Wife', creator: 'Robert & Michelle King', year: '2009–2016', note: 'Explores reinvention, firm politics, courtroom judgment, ethical ambiguity, and the long arc of a legal career.', tags: ['Career', 'Ethics'] },
      { title: 'Better Call Saul', creator: 'Vince Gilligan & Peter Gould', year: '2015–2022', note: 'A richly drawn cautionary tale about ambition, professional identity, small choices, and ethical erosion.', tags: ['Ethics', 'Identity'], trailerVideoId: 'Qz3u06eXf0E' },
      { title: 'The Good Fight', creator: 'Robert & Michelle King', year: '2017–2022', note: 'A sharp, heightened look at rebuilding a practice and navigating law amid institutional and political change.', tags: ['Law firm', 'Resilience'], trailerVideoId: 'iTPQLBFYrAY' },
      { title: 'Extraordinary Attorney Woo', creator: 'Moon Ji-won', year: '2022', note: 'Centers a gifted new lawyer learning workplace norms, client empathy, teamwork, and confidence in her own approach.', tags: ['New lawyer', 'Belonging'], trailerVideoId: 'MxeXECe2t-c' },
      { title: 'For Life', creator: 'Hank Steinberg', year: '2020–2021', note: 'Inspired by Isaac Wright Jr., it follows a wrongfully imprisoned man studying law and advocating for others.', tags: ['Justice', 'Perseverance'], trailerVideoId: 'uVexZ56TcS0' },
      { title: 'When They See Us', creator: 'Ava DuVernay', year: '2019', note: 'A difficult but essential dramatization of systemic failure, wrongful conviction, family impact, and accountability.', tags: ['Justice system', 'True story'], trailerVideoId: 'YyoSErErnCE', trailerLabel: 'OFFICIAL TEASER' },
      { title: 'The Lincoln Lawyer', creator: 'David E. Kelley', year: '2022–', note: 'A fast-moving view of criminal defense, case strategy, client management, recovery, and rebuilding a practice.', tags: ['Criminal defense', 'Practice'], trailerVideoId: 'pVvVNbLf7Ig' },
      { title: 'Damages', creator: 'Todd A. Kessler, Glenn Kessler & Daniel Zelman', year: '2007–2012', note: 'A dark study of mentorship, power, high-stakes litigation, and the boundaries an ambitious young lawyer confronts.', tags: ['Mentorship', 'Litigation'], trailerVideoId: 'a_oo8PDJzyE' },
    ],
  },
  {
    title: 'Books & memoirs', icon: 'books.vertical.fill', androidIcon: 'menu_book', items: [
      { title: 'Just Mercy', creator: 'Bryan Stevenson', year: '2014', note: 'A humane account of building the Equal Justice Initiative and learning to stay proximate to people affected by injustice.', tags: ['Memoir', 'Public interest'], coverUrl: 'https://images.penguinrandomhouse.com/cover/9780812994520' },
      { title: 'Becoming Justice Blackmun', creator: 'Linda Greenhouse', year: '2005', note: 'Uses a justice’s papers to illuminate how legal thinking, institutions, relationships, and responsibility evolve.', tags: ['Judiciary', 'Biography'], coverUrl: 'https://mpd-biblio-covers.imgix.net/9780805080575.jpg' },
      { title: 'My Own Words', creator: 'Ruth Bader Ginsburg with Mary Hartnett & Wendy W. Williams', year: '2016', note: 'Speeches and writings on advocacy, equality, collegiality, and a life built deliberately in the law.', tags: ['Essays', 'Leadership'], coverUrl: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781501145247/my-own-words-9781501145247_hr.jpg' },
      { title: 'The Color of Law', creator: 'Richard Rothstein', year: '2017', note: 'Shows how legal structures shaped residential segregation and why lawyers must understand history behind doctrine.', tags: ['Civil rights', 'Legal history'], coverUrl: 'https://cdn2.wwnorton.com/wwnproducts/LIVERT/6/3/9781631494536/9781631494536_300.jpeg' },
      { title: 'The Buffalo Creek Disaster', creator: 'Gerald M. Stern', year: '1976', note: 'A lawyer’s account of representing a community after catastrophe, from client interviews through complex litigation.', tags: ['Litigation', 'Client advocacy'], coverUrl: 'https://images.penguinrandomhouse.com/cover/9780307388490' },
      { title: 'The New Jim Crow', creator: 'Michelle Alexander', year: '2010', note: 'A broad critique of mass incarceration that invites close study of doctrine, systems, and the reach of legal institutions.', tags: ['Criminal justice', 'Policy'], coverUrl: 'https://thenewpress.org/wp-content/uploads/2026/09/9781595586438-scaled.jpg' },
      { title: 'Letters to a Young Lawyer', creator: 'Alan Dershowitz', year: '2001', note: 'Short reflections on advocacy, reputation, difficult clients, intellectual independence, and professional choices.', tags: ['Career', 'Advice'], coverUrl: 'https://www.hachettebookgroup.com/wp-content/uploads/2024/01/9780786722303.jpg' },
      { title: 'One L', creator: 'Scott Turow', year: '1977', note: 'A famous first-person account of 1L intensity; best read as one experience, not a universal picture of law school.', tags: ['Law school', 'Memoir'], coverUrl: 'https://images.penguinrandomhouse.com/cover/9780143119029' },
      { title: 'The Curmudgeon’s Guide to Practicing Law', creator: 'Mark Herrmann', year: '2006', note: 'Practical, opinionated guidance about writing, responsiveness, judgment, and becoming useful on a legal team.', tags: ['Practice', 'Professional skills'], coverUrl: 'https://i5.walmartimages.com/seo/The-Curmudgeon-s-Guide-to-Practicing-Law-Second-Edition-Paperback-9781641054331_5ce60187-a98a-4d1b-91f1-c2f47a6dd485.552bc72caca5de4b1c540771770a3cc9.jpeg?odnBg=FFFFFF&odnHeight=768&odnWidth=768' },
      { title: 'Law School Confidential', creator: 'Robert H. Miller', year: '2000', note: 'A stage-by-stage guide to classes, outlining, exams, recruiting, and managing the transition into legal education.', tags: ['Law school', 'Practical guide'], coverUrl: 'https://mpd-biblio-covers.imgix.net/9780312605117.jpg' },
    ],
  },
  {
    title: 'Documentaries & podcasts', icon: 'headphones', androidIcon: 'headphones', items: [
      { title: '13th', creator: 'Ava DuVernay', year: '2016', note: 'Connects constitutional text, criminal law, public policy, and the history of incarceration in the United States.', tags: ['Documentary', 'Justice system'] },
      { title: 'RBG', creator: 'Betsy West & Julie Cohen', year: '2018', note: 'Follows Justice Ginsburg’s path from student and professor to advocate and judge, with attention to strategy and stamina.', tags: ['Documentary', 'Biography'], trailerVideoId: 'biIRlcQqmOc' },
      { title: 'The Innocence Files', creator: 'Netflix documentary series', year: '2020', note: 'Examines wrongful-conviction work through evidence, forensic science, prosecutorial conduct, and post-conviction advocacy.', tags: ['Documentary', 'Innocence work'], trailerVideoId: 'Cdvy14fdjj8' },
      { title: 'Strict Scrutiny', creator: 'Crooked Media', note: 'Constitutional-law scholars discuss the Supreme Court, doctrine, advocacy, and what major decisions mean in practice.', tags: ['Podcast', 'Supreme Court'] },
      { title: 'Amicus', creator: 'Slate', note: 'A long-running podcast about courts, constitutional law, legal institutions, and the people affected by them.', tags: ['Podcast', 'Legal analysis'] },
      { title: 'More Perfect', creator: 'WNYC / Radiolab', note: 'Narrative seasons explore Supreme Court cases, constitutional conflicts, and how doctrine enters everyday life.', tags: ['Podcast', 'Legal history'] },
    ],
  },
];

export type AdmissionPathway = {
  school: string;
  location: string;
  pathway: string;
  detail: string;
  tags: string[];
  url: string;
};

export const admissionPathways: AdmissionPathway[] = [
  { school: 'Arizona State University — Sandra Day O’Connor College of Law', location: 'Phoenix, AZ', pathway: 'Test optional or JD-Next', detail: 'Its full-time on-campus application offers an ABA-approved test-optional pathway beginning with fall 2026. Applicants may also submit JD-Next; existing valid scores generally must be disclosed.', tags: ['Test optional', 'JD-Next', 'On campus'], url: 'https://law.asu.edu/admission/jd/full-time-on-campus' },
  { school: 'University of Arizona — James E. Rogers College of Law', location: 'Tucson, AZ', pathway: 'JD-Next in place of LSAT/GRE', detail: 'Arizona accepts LSAT, GRE, or JD-Next scores earned within the school’s stated validity window and describes JD-Next as an alternative admissions pathway.', tags: ['JD-Next', 'LSAT alternative'], url: 'https://law.arizona.edu/academics/degrees/juris-doctor-jd/how-apply-jd' },
  { school: 'University of Denver — Sturm College of Law', location: 'Denver, CO', pathway: 'JD-Next in place of LSAT/GRE', detail: 'Denver permits LSAT, GRE, or JD-Next and notes that it expects to admit a limited number of applicants using JD-Next instead of the other tests.', tags: ['JD-Next', 'Holistic review'], url: 'https://law.du.edu/admissions/jd-admissions/jd-application-information' },
  { school: 'DePaul University College of Law', location: 'Chicago, IL', pathway: 'LSAT, GRE, or JD-Next', detail: 'DePaul accepts JD-Next as an admission test. If an applicant also has a reportable LSAT, the school says the LSAT is considered the primary score.', tags: ['JD-Next', 'GRE option'], url: 'https://law.depaul.edu/admission/jd-admission/prospective-student-faq' },
  { school: 'Case Western Reserve University School of Law', location: 'Cleveland, OH', pathway: 'LSAT, GRE, or JD-Next', detail: 'Case Western lists all three tests as accepted options for its JD admissions process, including its in-person and part-time online pathways.', tags: ['JD-Next', 'Online option'], url: 'https://case.edu/law/admissions/jd-admissions' },
  { school: 'University of Dayton School of Law', location: 'Dayton, OH', pathway: 'LSAT, GRE, or JD-Next', detail: 'Dayton accepts a JD-Next score for both residential and online hybrid JD applications; applicants using it still register with LSAC’s CAS.', tags: ['JD-Next', 'Hybrid option'], url: 'https://udayton.edu/law/admissions/application-process.php' },
  { school: 'Loyola University New Orleans College of Law', location: 'New Orleans, LA', pathway: 'JD-Next in place of LSAT/GRE', detail: 'Loyola’s published JD-Next pathway accepts the exam instead of LSAT or GRE for applicants who meet its stated eligibility requirements, including a minimum undergraduate GPA.', tags: ['JD-Next', 'Eligibility rules'], url: 'https://law2.loyno.edu/admission/jd-next-acceptance' },
  { school: 'Brigham Young University J. Reuben Clark Law School', location: 'Provo, UT', pathway: 'JD-Next or limited LSAT exemption', detail: 'BYU accepts the JD-Next course and exam as an admission test and separately describes a narrowly defined LSAT-exemption route for eligible applicants.', tags: ['JD-Next', 'LSAT exemption'], url: 'https://new.law.byu.edu/admissions/resources?tab=admissions-tests' },
];

export type MentorProgram = {
  name: string;
  provider: string;
  availability: string;
  description: string;
  tags: string[];
  url: string;
};

export const mentorPrograms: MentorProgram[] = [
  { name: 'Launchpad Scholars Program', provider: 'Yale Law School + Latham & Watkins', availability: 'Free · cohort application', description: 'A yearlong program with attorney and law-student mentors, LSAT preparation, application guidance, career readiness, and a residential institute. It supports applications to any law school.', tags: ['1:1 mentorship', 'LSAT prep'], url: 'https://law.yale.edu/launchpad' },
  { name: 'Plus, Guided Journey', provider: 'Law School Admission Council', availability: 'Free · eligibility based', description: 'A cohort-based journey for applicants facing structural barriers, with direct support through test preparation, application materials, law-school exploration, and decision-making.', tags: ['Application journey', 'Community'], url: 'https://www.lsac.org/discover-law/access-and-community-law-school/plus-program' },
  { name: 'LexPreLaw Admission Counseling', provider: 'AccessLex Institute', availability: 'Free · cohort and open resources', description: 'Comprehensive admission counseling for a selected cohort, plus MAX Pre-Law lessons, webinars, checklists, and one-on-one financial strategy coaching for prospective students.', tags: ['Admissions counseling', 'Financial coaching'], url: 'https://www.accesslex.org/lexprelaw-admission-counseling-cohort-participation-information' },
  { name: 'SEO Law Catalyst', provider: 'SEO Law', availability: 'Free · competitive cohort', description: 'A structured pre-law program with an admissions clinic, mentorship clinic, law-school exposure, and application support for eligible applicants.', tags: ['Mentorship clinic', 'Application support'], url: 'https://www.seo-usa.org/law/our-program/apply-to-catalyst/' },
  { name: 'Law Fellows Program', provider: 'UCLA School of Law', availability: 'Free · regional academies', description: 'Academic enrichment, admissions workshops, LSAT preparation guidance, and ongoing mentoring and counseling through matriculation and beyond.', tags: ['Long-term mentorship', 'Workshops'], url: 'https://law.ucla.edu/outreach' },
  { name: 'LEAP Fellowship', provider: 'Legal Education Access Pipeline', availability: 'Free · eligibility based', description: 'A nine-month fellowship with attorney and law-student mentors, admissions counseling, a full LSAT course, workshops, and exposure to legal careers.', tags: ['Attorney mentor', 'LSAT course'], url: 'https://www.legalpipeline.org/what-we-do/program-description/' },
  { name: 'Underrepresented Pre-Law Mentorship', provider: 'Underrepresented', availability: 'Free · mentor matching', description: 'Connects applicants from underrepresented, first-generation, and low-income backgrounds with law students and graduates for individualized admissions guidance.', tags: ['Mentor matching', 'Essay support'], url: 'https://www.underrepresentedlaw.com/' },
  { name: 'Future Leaders in Law', provider: 'Harvard Law School + Paul, Weiss', availability: 'Free · on hiatus 2026–27', description: 'A fully funded yearlong fellowship with law-student mentoring, admissions preparation, LSAT support, and application-fee assistance. The official page offers updates for its planned return.', tags: ['Mentorship', 'Fully funded'], url: 'https://hls.harvard.edu/professional-and-lifelong-learning/pre-law-programs/future-leaders-in-law-program/' },
];
