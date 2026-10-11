import { A } from './assets'
export type Obj = { name?: string; medium: string; title: string; text: string; img?: string; glb?: string }
export const INTRO = [
  'Home, for me now, is made of things that do not last: Royco sachets that run out, train tickets good for one ride, twelve songs for the twelve months I could not go back.',
  'I keep rebuilding Indonesia in a small one-room, one meal at a time, and each time, it is a little different.',
  'For now, I keep those things here.',
  'This museum is a digital memory capsule: a small, personal archive of ordinary things, such as Indomie, Royco, train tickets, and a Spotify playlist, kept here because each one carried a piece of home with me.'
]

// The two lines that frame INTRO on the rust intro screen.
export const INTRO_LEAD = 'The Museum of Transience collects what does not stay.'
export const INTRO_CLOSE = 'Take your time.'

const P = 'AI-Reconstructed Painting, 2026', S = '3D Scan, 2026'

export const ROOM1: Obj[] = [
  { medium: P, title: "The Taste I Knew by Heart", img: A.indomie, text: 'I never thought much about Indomie Goreng when I was in Indonesia. It was cheap, easy, and always there when I wanted something familiar. In Korea, I started noticing how comforting it was to make the same thing again: the noodles, the seasoning, the sweet-salty taste I already knew by heart. Nothing about it is special, and maybe that is exactly why I keep coming back to it. Some foods become memories only after you have to leave them behind.' },
  { medium: P, title: 'Soto Without the Warung', img: A.soto, text: 'Back home, I almost never cooked soto. It was always nearby, warm and filling, from a roadside stall to a five-star hotel. In Korea, I have not found Indonesian restaurants selling it, and the seasoning is easy enough, so I had to make it myself. When late autumn arrives, it is what I cook again and again. The taste is not quite the same. There are no condiments, no fried snacks, no warung around the corner. Still, it brings back my memories from home.' },
  { medium: P, title: 'Indonesian in a Sachet', img: A.royco, text: 'I think of Royco as the magic MSG of Indonesian cooking. Unlike seasonings from elsewhere, it makes whatever I cook taste distinctly Indonesian. I use it in almost every dish. Not every ingredient I grew up with is easy to find in Korea, but this little sachet is usually within reach. It is ordinary, inexpensive, and quickly used up. Maybe that is part of why I notice it. Something so temporary can still make a meal taste like home.' },
  { medium: P, title: 'Salty, Savory, Golden', img: A.marinasi, text: 'This all-purpose marinade works on tempeh, chicken, or fish, but I like it best with fried tempeh. The soybeans soften as they marinate, the frying turns them golden brown, and the smell of coriander fills the kitchen. Salty, savory, and, in my honest opinion, delicious. It is not an elaborate recipe or a special occasion. It is simply one of the things I make when I want food to taste familiar. Sometimes, that is more than enough.' },
  { medium: P, title: 'Pepper I Carry With Me', img: A.lada, text: 'I did not think much about Indonesian spices until I left Indonesia. After living abroad, I began noticing how different the pepper I found elsewhere tasted. So, I started carrying Indonesian spices with me. This small packet of pepper is one of them. It follows me into my cooking, meeting Royco and whatever ingredients I can find here. Somehow, the taste brings something back—not exactly Indonesia itself, but a version of it I can still make in my own kitchen.' },
  { medium: P, title: 'Tea for Every Ailment', img: A.tea, text: "To me, warm tea used to cure almost everything. Its jasmine scent also brings back my grandmother's village, where tea was rarely sweetened. I used to resent having to fetch sugar. Now, I prefer mine unsweetened. The memory changed somewhere along the way. What once felt like an ordinary inconvenience has become something I remember with affection. Perhaps distance does that: it makes small things noticeable only after they are no longer part of everyday life." },
  { medium: S, title: 'Uniquely Indonesian, Quietly So', glb: A.glb.crusita, text: 'I think of this perfume as quietly Indonesian. Its tea and jasmine notes remind me of the kitchen shelf, of drinks served at home, of a scent I can recognize without having to name it. It does not smell like Indonesia in any obvious way. There are no loud spices or heavy sweetness. Just something familiar, something I seem to know before I can place it. Perhaps that is what I like about it. It brings home back in the smallest way. Not as a place, but as a feeling I can still recognize.' },
  { medium: S, title: 'Good Luck for a New Room', glb: A.glb.bugeo, text: 'Every Korean class came with a cultural activity. One day, we made bugeo (북어). The teacher told us that Koreans usually place it in a new home when moving, for good luck. Now I have moved into a new one-room, and I display mine there for the same reason. It sits in my room, quietly becoming part of it. I did not grow up with this custom. Yet here it is, in my room.' },
  { medium: S, title: 'This Room Makes Me', glb: A.glb.diffuser, text: 'I bought this reed diffuser for my bedroom because I wanted the room to feel nicer. I did not expect to keep it for this long. More than a year later, its scent has become part of the room itself—mixed into the air where I sleep, study, eat, and spend ordinary days. Somewhere along the way, I stopped noticing it as something I had bought and started noticing it as part of where I lived. The room was temporary. Somehow, this stayed.' },
]
export const ROOM4: Obj[] = [
  { medium: S, title: 'A Small Piece of Elsewhere', glb: A.glb.lego, text: 'A friend from the office gave me this custom LEGO piece, designed around the oil and gas field, when we were both preparing to leave a workplace we had once shared. It was a parting gift, and when I moved to Korea, I brought it with me.\n\nIt did not need to come. It was small enough to fit almost anywhere, but there was no practical reason to make space for it. I brought it because someone had given it to me, and because leaving a place does not always mean leaving everything behind.\n\nNow it sits in my room, far from the office and the person who gave it to me. The place it came from has changed. I have too. Somehow, this small piece remained.' },
  { medium: S, title: 'A Familiar Face', glb: A.glb.jeong, text: "I bought Jeong Bokhyun (정보현) in Korea, before Jaehyun's fancon. At the time, it felt like a small marker of something returning—a comeback, a concert to look forward to, and the particular excitement of being a fan again.\n\nLater, when I moved from my first dorm into this one-room, he came with me. At around thirty centimetres, he was not exactly easy to overlook, but somehow he became part of the move, along with the things that made the new room feel familiar.\n\nHe was not something I brought from home. I found him here. But somewhere between one room and another, he became part of mine." },
]
export const ROOMS = [
  { n: 'I', title: 'Things That Carry Taste & Good Fortune', sub: 'For ingredients, scents, and rituals that make an unfamiliar room feel like home.' },
  { n: 'II', title: 'Things That Record the Journey', sub: 'For routes, coordinates, and the invisible paths that connect a year in transit.' },
  { n: 'III', title: 'Echoes & Encores', sub: 'For melodies, fan banners, and shared spaces that kept enthusiasm alive.' },
  { n: 'IV', title: 'Reconstructions & Afterimages', sub: 'For AI-reconstructed memories, quiet rooms, and fragments that stayed behind.' },
]
export const TRAIN_MEDIUM = 'Digital vector map & continuous transit reconstruction, 2026'
export const TRAIN_TITLE = 'Map of Unspoken Routes'
export const TRAIN_TEXT = ['These lines map a personal geography of movement across South Korea. What began as solitary rides on Mugunghwa trains, ITX, and intercity buses connecting Daejeon with Seoul, Jeonju, Busan, Gyeongju, Chuncheon, Boryeong, Gongju, and Buyeo slowly turned into a network of belonging. Each route marks a temporary displacement—a journey taken to find unfamiliar streets, and the inevitable return to the quiet routine of a study room.']
export const TIKTOK = { medium: 'Screenshot and AI-Generated Glitch Art, 2026', title: 'Learning Through the Unknown', text: ['Learning Korean did not always feel straightforward. What I heard in the classroom was not always what appeared on the test, so I began looking for other ways to practise reading and writing. Eventually, I found myself on TikTok.', 'Most of the useful explanations that reached me came from Vietnamese creators. When I could not understand the Vietnamese, automatic English translation helped fill the gaps. Somehow, I was learning my eighth language through a ninth language I did not know, translated through a third that I did.', 'It was an unusual way to learn. But it worked. The interface became part of the process: another layer between me and the language I was trying to understand. Here, I leave those layers to glitch and dissolve.'] }
export const SPOTIFY = { name: 'Playlist Spotify', medium: 'Spotify Playlist (Embedded), 2026', title: 'Twelve Songs, Twelve Months', text: 'Twelve songs for twelve months: the time I could not go home after first arriving in Korea. Each track holds a different kind of longing for my hometown. I made the playlist for dormitory solitude and late-night study, mixing Indonesian nostalgic melodies with quiet ambient sounds. It opens with Forget Jakarta and closes with Rehat, which means rest. Somewhere between the two, the songs became a way of measuring time. Press play to listen.' }
export const SLOGANS = { name: 'Concert Slogans (NCT DREAM + Jaehyun Fancon)', medium: 'Photograph, 2026', title: 'A Small Way to Be There', text: "The slogans came from two concerts: NCT DREAM's encore and Jaehyun's fancon. I carried them home after the lights went down, keeping what was meant to last only for an evening. They are simple pieces of paper, but I cannot quite throw them away. Maybe because they hold the feeling of being there—not simply watching from a screen, but sharing a room with thousands of other people, if only for a few hours." }
export const TICKETS = { name: 'Concert Tickets', medium: 'Photograph, 2026', title: 'Proof That I Was There', text: "These photographs hold two concert tickets: one from an NCT DREAM encore, the other from Jaehyun's fancon. The concerts lasted only a few hours, but the tickets remained after the lights went out and everyone went home. I kept them because they are small proofs of having been there—not simply watching from a screen, but standing among other people and experiencing the moment in real time. The concerts are over. The tickets are not useful anymore. I kept them anyway." }
export const OUTRO = ['Thank you for visiting.', 'The sachets will be used up, and the tickets have already been used.', 'What I tried to keep here is not the objects, but how they felt to hold at this point in my life.', 'The photographs, scans, paintings, and glitches are not the memories themselves. They are only the ways I have tried to hold them.', 'Before you leave, look once at something on your own shelf that will not last.']

// 12 tracks = 12 months. The cassette's previous/next keys simply step through this list (01 to 12, then around).
export const PLAYLIST_ID = '5WgnnjciGyI7TqGd3oWr9T'

export const SIDES = {
  A: 'The Crossing',
  B: 'The Settling'
} as const

export type Song = { id: number; side: 'A' | 'B'; title: string; artist: string; month: string; note: string; spotifyId: string }
export const TWELVE_SONGS: Song[] = [
  // SIDE A: The Crossing
  { id: 1, side: 'A', title: 'Forget Jakarta', artist: 'Adhitia Sofyan', month: 'Month 01', note: 'A quiet farewell to the familiar noise of home before stepping into Daejeon.', spotifyId: '4UucLisbPzUcqYCE6cQX2z' },
  { id: 2, side: 'A', title: 'Pulang', artist: 'Float', month: 'Month 02', note: 'Solitude in the dormitory room, searching for warmth in an unfamiliar season.', spotifyId: '0OuHEecHeaMLePU8XjYuEt' },
  { id: 3, side: 'A', title: 'Tentang Rumahku', artist: 'Dialog Dini Hari', month: 'Month 03', note: 'Realizing home is no longer a fixed place, but memories carried along.', spotifyId: '7q8lXVcXKQWFLcZWtsBELP' },
  { id: 4, side: 'A', title: 'Yang Patah Tumbuh, Yang Hilang Berganti', artist: 'Banda Neira', month: 'Month 04', note: 'Accepting distance and change, trusting that every displacement nurtures new growth.', spotifyId: '0hzIdk9dIvDablVS6UW7Vi' },
  { id: 5, side: 'A', title: 'Bertaut', artist: 'Nadin Amizah', month: 'Month 05', note: 'A quiet homage to mother back home, spanning thousands of kilometers.', spotifyId: '630DpnzdfjdVqv2yLfPbAX' },
  { id: 6, side: 'A', title: 'Kota', artist: 'Dere', month: 'Month 06', note: 'Observing the quiet rhythm of Daejeon streets as they slowly become familiar.', spotifyId: '0SeBJ2sAl8CV58kBfpd5va' },
  
  // SIDE B: The Settling
  { id: 7, side: 'B', title: 'Pelangi', artist: 'HiVi!', month: 'Month 07', note: 'Small bursts of joy and light found between study routines and research hours.', spotifyId: '3ZwqWrRpylU9nfy99qwKdR' },
  { id: 8, side: 'B', title: 'Asmalibrasi', artist: 'Soegi Bornean', month: 'Month 08', note: 'Finding emotional balance and harmony while living abroad.', spotifyId: '3TFdXrYIubXABQh0CxIiSs' },
  { id: 9, side: 'B', title: 'Untuk Perempuan Yang Sedang Di Pelukan', artist: 'Payung Teduh', month: 'Month 09', note: 'Nostalgic warmth accompanying quiet study sessions late at night.', spotifyId: '0urpBLpcm6DOGzs86rcKd8' },
  { id: 10, side: 'B', title: 'Ada di Sana', artist: 'Danilla', month: 'Month 10', note: 'Gentle longings drifting along afternoon walks.', spotifyId: '1HAoKXfkYWBkzEcpkR0Y20' },
  { id: 11, side: 'B', title: 'Kesepian Kita', artist: 'Pas Band ft. Tere', month: 'Month 11', note: 'Embracing solitude not as sadness, but as part of the journey.', spotifyId: '2L12TgtkatZ5fcHuioCQ2M' },
  { id: 12, side: 'B', title: 'Rehat', artist: 'Kunto Aji', month: 'Month 12', note: 'A gentle reminder to pause, breathe, and rest after a full year in transit.', spotifyId: '7mjO4RbTZIb1SfE8G673Lm' }
]

export const SIDE_NOTE = 'Divided like a classic cassette tape, Side A (The Crossing) captures the initial months of arrival, navigating distance, and searching for familiarity. Side B (The Settling) reflects the quiet acceptance, finding a steady rhythm in daily life, and embracing moments of rest. Click on every title to know more about the song.'

// DRAFTS for the four popup cards (shown next to the flip view). They only use facts you gave me,
// so please add your own details (seat, what you felt, who you went with) in your own words.
export const PIECE_NOTES = {
  jaehyunSlogan: 'I held this Dandelion slogan up at Jaehyun\'s fancon. It is only a few words on paper, but for those hours it was the one thing I could raise toward the stage. When the lights came up I was still holding it, and it came home with me. Now it is just paper again, and I still cannot throw it away.',
  nctSlogan: 'This one belongs to the encore: the last stretch of the night, when the room is loud and nobody is ready to leave. A slogan is made to be seen for one evening, held up among thousands of others. I kept mine after the lights went down because it was the closest thing I had to carrying that sound home.',
  jaehyunTicket: 'This is the physical ticket for Jaehyun\'s fancon. For a few hours, the seat printed on it was the exact place I belonged in a room full of strangers. Turn it over and it looks like nothing, just a piece of paper that once decided where I would sit inside a memory.',
  nctTicket: 'The encore ticket was my way into the last evening of the show. The concert ended, the crowd went home, and the ticket stopped being useful. It stays here as proof that I was in that room, not watching from a screen.',
}
