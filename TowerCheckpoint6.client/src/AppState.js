import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Event.js').Event[]} */
  events: [],
  /** @type {import('./models/Event.js').Event | null} */
  CurrentEvent: null,
  /** @type {import('./models/Comment.js').Comment | null} */
  comments: [],
  /** @type {import('./models/Comment.js').Comment[]} */
  CurrentComment: [],
  /** @type {import('./models/.Attendee.js').Attendee[]} */
  Attendees: [],
  /** @type {import('./models/Attendee.js').Attendee|null} */
  Attendee: null

})
