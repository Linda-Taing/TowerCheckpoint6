import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/TowerEvent.js').TowerEvent[]} */
  events: [],
  /** @type {import('./models/TowerEvent.js').TowerEvent | null} */
  currentEvent: null,
  /** @type {import('./models/Comment.js').Comment | null} */
  comments: [],
  /** @type {import('./models/Comment.js').Comment[]} */
  currentComment: [],
  /** @type {import('./models/.Attendee.js').Attendee[]} */
  attendees: [],
  /** @type {import('./models/Attendee.js').Attendee|null} */
  attendee: null

})
