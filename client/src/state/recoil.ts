import { atom } from 'recoil'

type User = {
	email: string
	name: string
	token: string
}

export const userAtom = atom<User>({
	key: 'user',
	default: {
		name: '',
		email: '',
		token: '',
	},
})
