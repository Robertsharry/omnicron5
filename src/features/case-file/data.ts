import type { Choice, Incident, StoryBeat } from "./types";

const choice = (text: string, delta: Choice["delta"], log: string): Choice => ({ text, delta, log });

export const INCIDENTS: readonly Incident[] = [
  {
    title: "The Moon Has Filed a Complaint",
    subject: "the moon",
    dispatch: "At 08:14, the moon submitted a formal noise complaint against Earth. It has requested one representative. Unfortunately, it asked for you by name.",
    location: "Roof of an IKEA",
    threat: "Passive-aggressive",
    witnesses: "2 owls, one lawyer",
    sigil: "◒",
    openingChoices: [
      choice("Ask the moon to identify the specific planet making the noise.", [13, 5, 2], "Cross-examined Earth's only moon."),
      choice("Arrive disguised as a licensed lunar zoning inspector.", [7, 16, 4], "Conducted an unauthorized crater inspection."),
      choice("Counter-file Form L-UN-A: Unauthorized Nighttime Loitering.", [-1, -3, 20], "Opened a celestial counter-complaint."),
    ],
  },
  {
    title: "All the Shadows Are Late",
    subject: "the rogue shadow",
    dispatch: "Every shadow in the city is now moving eleven seconds behind its owner. One of them has stopped following altogether and is waiting outside your door.",
    location: "Your general vicinity",
    threat: "Unfashionably high",
    witnesses: "Everyone, technically",
    sigil: "◩",
    openingChoices: [
      choice("Open the door and ask your shadow where it was at 9:17 PM.", [14, 8, 1], "Interrogated own silhouette without counsel."),
      choice("Turn off every light. If nobody has a shadow, nobody is late.", [8, 18, 3], "Solved lateness through aggressive darkness."),
      choice("Issue the shadow a written warning for abandonment of person.", [1, -2, 19], "Placed a silhouette on administrative probation."),
    ],
  },
  {
    title: "The Vending Machine Knows Too Much",
    subject: "the prophetic vending machine",
    dispatch: "A vending machine on Platform 6 is dispensing snacks from people's childhoods and whispering the exact date of their next terrible haircut.",
    location: "Platform 6½",
    threat: "Crunchy",
    witnesses: "14 commuters",
    sigil: "▦",
    openingChoices: [
      choice("Insert exact change and request one bag of classified memories.", [10, 13, 2], "Purchased evidence for $1.35."),
      choice("Unplug it while loudly insisting free will is not a snack.", [17, 7, 1], "Attempted to unplug destiny."),
      choice("Demand its food-service permit and prophecy disclosure license.", [3, -4, 18], "Audited an appliance's occult permits."),
    ],
  },
  {
    title: "Tuesday Is Missing",
    subject: "the missing Tuesday",
    dispatch: "Tuesday has vanished from all calendars. Citizens are proceeding directly from Monday into Wednesday and reporting a vague sense of unfinished laundry.",
    location: "Temporal Records",
    threat: "Chronological",
    witnesses: "7.9 billion",
    sigil: "⌁",
    openingChoices: [
      choice("Leave Tuesday a voicemail saying Wednesday told you everything.", [12, 12, 1], "Attempted to provoke a weekday into returning."),
      choice("Search the space between 11:59 Monday and 12:01 Wednesday.", [9, 17, 3], "Entered a deeply suspicious two-minute interval."),
      choice("Mark Tuesday as absent without leave and dock its holiday pay.", [2, -3, 20], "Escalated temporal absence to payroll."),
    ],
  },
  {
    title: "The Pigeons Have Unionized",
    subject: "the pigeon negotiating committee",
    dispatch: "The pigeons have formed a bargaining unit. Their demands include better breadcrumbs, statue access, and one seat on the city council.",
    location: "Civic Plaza",
    threat: "Collective",
    witnesses: "A nervous mayor",
    sigil: "◇",
    openingChoices: [
      choice("Recognize the union and ask which pigeon handles benefits.", [8, 8, 8], "Entered good-faith talks with organized birds."),
      choice("Send in a decoy statue wearing a hidden microphone.", [10, 18, 2], "Infiltrated labor negotiations with public art."),
      choice("Challenge the council-seat demand on residency grounds.", [4, -2, 18], "Requested 400 tiny proofs of address."),
    ],
  },
  {
    title: "Gravity Is Feeling Experimental",
    subject: "the sideways gravity field",
    dispatch: "Gravity has begun working sideways in one laundromat. Socks are orbiting the dryers. A small crowd is selling tickets.",
    location: "Spin Cycle Laundry",
    threat: "Approximately left",
    witnesses: "23 + one terrier",
    sigil: "↯",
    openingChoices: [
      choice("Walk in sideways to establish dominance over local physics.", [16, 11, 0], "Established a confrontational relationship with down."),
      choice("Add one fitted sheet and observe the resulting weather system.", [7, 20, 2], "Introduced unstable laundry to unstable gravity."),
      choice("Cite gravity for operating without a directional variance permit.", [2, -4, 20], "Issued physics a municipal citation."),
    ],
  },
  {
    title: "A Door Appeared in the Ocean",
    subject: "the ocean door",
    dispatch: "A perfectly ordinary red door is standing six miles offshore. It is dry, unlocked, and somebody on the other side keeps knocking politely.",
    location: "Pacific Ocean",
    threat: "Well-mannered",
    witnesses: "3 confused dolphins",
    sigil: "▯",
    openingChoices: [
      choice("Knock back using the Bureau-approved secret rhythm: shave-and-a-lawsuit.", [12, 13, 2], "Established diplomatic knocking relations."),
      choice("Open it one inch and ask whether they have an appointment.", [15, 9, 3], "Made first contact through a security chain."),
      choice("Post a waterproof notice: DOOR PENDING ZONING REVIEW.", [1, -3, 21], "Applied coastal planning law to impossible carpentry."),
    ],
  },
  {
    title: "Your Future Self Wants a Refund",
    subject: "your furious future self",
    dispatch: "A version of you from seventeen years in the future is at reception demanding a refund. They refuse to specify what for, but brought a very angry plant.",
    location: "Bureau lobby",
    threat: "Personal",
    witnesses: "The plant",
    sigil: "⧖",
    openingChoices: [
      choice("Demand identification only you would know—and immediately regret asking.", [11, 12, 2], "Verified identity using an unforgivable memory."),
      choice("Offer store credit valid exclusively in the present timeline.", [7, 9, 8], "Attempted temporal retail diplomacy."),
      choice("Explain that all future purchases are final in the past.", [3, -2, 19], "Deployed airtight chronological fine print."),
    ],
  },
];

export const PHASES = ["INITIAL CONTACT", "FIELD RESPONSE", "COMPLICATION", "CRITICAL DECISION", "FINAL MANEUVER"] as const;

type BeatFactory = (incident: Incident) => StoryBeat;

export const BEAT_POOLS: Readonly<Record<number, readonly BeatFactory[]>> = {
  1: [
    incident => ({
      dispatch: `${capitalize(incident.subject)} refuses to continue until you prove humanity deserves to be taken seriously. You have thirty seconds and no useful qualifications.`,
      choices: [
        choice("Present a laminated card that says HUMANITY: MOST IMPROVED.", [9, 8, 7], "Submitted suspicious species-level credentials."),
        choice(`Challenge ${incident.subject} to name one other species with competitive baking shows.`, [13, 13, 1], "Defended humanity using televised pastry."),
        choice("Request a thirty-day extension on behalf of the entire species.", [1, -2, 18], "Bought humanity one administrative month."),
      ],
    }),
    incident => ({
      dispatch: `${capitalize(incident.subject)} demands a ceremonial tribute before negotiations can begin. Headquarters has authorized up to twelve dollars.`,
      choices: [
        choice(`Offer ${incident.subject} a tiny coffee and the good office stapler.`, [7, 8, 6], "Sacrificed Bureau stationery for peace."),
        choice("Present twelve dollars in pennies arranged like a warning.", [10, 16, 2], "Delivered an unsettlingly exact tribute."),
        choice("Submit a receipt for the tribute before actually buying one.", [2, -3, 19], "Reimbursed self for a hypothetical offering."),
      ],
    }),
    incident => ({
      dispatch: `${capitalize(incident.subject)} asks to speak to your supervisor. Your supervisor has blocked your number and is visibly hiding behind a fern.`,
      choices: [
        choice("Straighten your collar. You are the supervisor now.", [14, 7, 5], "Promoted self during active negotiations."),
        choice("Bring in the fern. It has seniority and excellent boundaries.", [6, 17, 2], "Escalated matter to botanical leadership."),
        choice("Schedule a supervisor callback for the year 2094.", [2, -4, 19], "Weaponized the Bureau calendar."),
      ],
    }),
  ],
  2: [
    incident => ({
      dispatch: `A goose in a necktie lands between you and ${incident.subject}, produces a badge, and bellows that this is now Goose Jurisdiction.`,
      choices: [
        choice("Salute the goose. Incorrectly, but with devastating confidence.", [12, 10, 2], "Recognized an aggressively unclear chain of command."),
        choice("Distract it with a decoy jurisdiction made entirely of bread.", [7, 19, 1], "Redirected federal waterfowl with carbohydrates."),
        choice("Demand the goose's badge number and migratory tax records.", [4, -2, 18], "Opened an interagency audit of one goose."),
      ],
    }),
    incident => ({
      dispatch: `A fax arrives from 1997: “DO NOT LET ${incident.subject.toUpperCase()} TRUST THE COLOR BEIGE.” The fax then begins smoking judgmentally.`,
      choices: [
        choice("Remove every beige object while maintaining direct eye contact.", [10, 13, 3], "Conducted emergency color extraction."),
        choice("Fax back: TOO LATE. SEND BETTER COLORS.", [12, 16, 2], "Entered a chromatic dispute with 1997."),
        choice("Classify beige as a controlled neutral pending review.", [2, -3, 20], "Placed a color under administrative quarantine."),
      ],
    }),
    incident => ({
      dispatch: `Someone begins narrating your encounter with ${incident.subject} through ominous jazz played on a plastic recorder. It is affecting morale.`,
      choices: [
        choice("Continue the mission in time with the solo.", [11, 14, 1], "Synchronized field operations to hostile jazz."),
        choice("Counter with an even more ominous kazoo.", [8, 21, 0], "Achieved musical escalation dominance."),
        choice("Issue a noise citation in the key of B-flat.", [3, -2, 18], "Cited a soundtrack for excessive foreshadowing."),
      ],
    }),
  ],
  3: [
    incident => ({
      dispatch: `Headquarters orders immediate containment. ${capitalize(incident.subject)} quietly asks whether “containment” means it did something wrong.`,
      choices: [
        choice("Tell headquarters the containment machine is updating.", [8, 10, 9], "Protected feelings via fictitious software update."),
        choice(`Give ${incident.subject} a fake mustache and declare it a different anomaly.`, [9, 20, 2], "Defeated facial recognition conceptually."),
        choice("Open a restorative-justice circle with the containment team.", [5, 11, 12], "Converted tactical response into group sharing."),
      ],
    }),
    incident => ({
      dispatch: `A second, slightly more expensive-looking ${incident.subject} appears and claims the first one is an impostor. Both demand you choose immediately.`,
      choices: [
        choice("Choose the cheaper-looking one. Respect a bargain.", [12, 9, 1], "Selected authenticity by perceived retail value."),
        choice("Declare yourself the impostor and watch their confidence collapse.", [15, 18, 0], "Introduced a third suspect for tactical reasons."),
        choice("Require both to submit matching Form 2-REALs.", [2, -1, 21], "Resolved identity crisis through duplicate paperwork."),
      ],
    }),
    incident => ({
      dispatch: `The witnesses have begun worshipping ${incident.subject}. Somebody is selling commemorative mugs. The Bureau wants its percentage.`,
      choices: [
        choice("Deliver a sermon about responsible anomaly ownership.", [10, 15, 4], "Assumed temporary spiritual leadership."),
        choice("Seize the mugs and open the Bureau gift shop.", [6, 17, 10], "Monetized unauthorized monetization."),
        choice("Register the belief system as a nonprofit before lunch.", [3, 5, 18], "Secured tax status for an emerging cult."),
      ],
    }),
  ],
  4: [
    incident => ({
      dispatch: `A console rises from the floor beside ${incident.subject}. Its only control is labeled ABSOLUTELY PROBABLY. A tiny fanfare begins.`,
      choices: [
        choice("Press it with the Bureau's official long stick.", [16, 15, 0], "Pressed destiny from a union-approved distance."),
        choice("Make the fanfare more dramatic, then press it on the beat.", [12, 20, 1], "Timed catastrophe for maximum production value."),
        choice("Affix a label reading NOT OUR BUTTON and leave.", [2, -3, 24], "Reassigned button jurisdiction using adhesive."),
      ],
    }),
    incident => ({
      dispatch: `${capitalize(incident.subject)} offers a deal: the incident ends now, but every Thursday you must mail it one object that is “surprisingly damp.”`,
      choices: [
        choice("Accept, then immediately begin defining ‘damp’ in bad faith.", [8, 10, 8], "Signed treaty with aggressive moisture ambiguity."),
        choice("Counteroffer one extremely damp object today. No Thursdays.", [13, 17, 2], "Front-loaded an unsettling obligation."),
        choice("Add a six-page moisture exemption and initial every corner.", [3, -2, 22], "Buried dampness beneath contractual sediment."),
      ],
    }),
    incident => ({
      dispatch: `Reality tears open behind ${incident.subject} in the exact shape of a filing cabinet. From inside, something shouts: “WRONG TIMELINE, CHAMP.”`,
      choices: [
        choice("Shout “YOU FIRST” and hold the tear open like a door.", [17, 13, 0], "Challenged another timeline to basic courtesy."),
        choice(`Push ${incident.subject} through, then follow for narrative symmetry.`, [11, 22, 1], "Entered wrong timeline with strong composition."),
        choice("Close the drawer and mark it CONFIDENTIAL.", [4, -3, 23], "Contained reality using records-management policy."),
      ],
    }),
  ],
};

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
