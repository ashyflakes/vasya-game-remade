import { Howl, Howler } from 'howler';

const sounds = {
	click: new Howl({
		src: ['/audio/meow-1.mp3'],
		volume: 0.75,
		preload: true,
	}),

	catnip: new Howl({
		src: ['/audio/catnip-boost.mp3'],
		volume: 0.85,
		preload: true,
	}),

	click2: new Howl({
		src: ['/audio/meow-5.mp3'],
		volume: 0.75,
		preload: true,
	}),

	click3: new Howl({
		src: ['/audio/meow-2.mp3'],
		volume: 0.75,
		preload: true,
	}),
	click4: new Howl({
		src: ['/audio/meow-3.mp3'],
		volume: 0.75,
		preload: true,
	}),
	click5: new Howl({
		src: ['/audio/meow-4.mp3'],
		volume: 0.75,
		preload: true,
	}),
	click6: new Howl({
		src: ['/audio/meow-6.mp3'],
		volume: 0.75,
		preload: true,
	}),

	upgrade: new Howl({
		src: ['/audio/buy.mp3'],
		volume: 0.8,
		preload: true,
	}),

	fart: new Howl({
		src: ['/audio/fart-with-reverb.mp3'],
		volume: 0.8,
		preload: true,
	}),
};

export const soundManager = {
	playClick() {
		sounds.click.play();
	},
	playCatnip() {
		sounds.catnip.play();
	},

	playClick2() {
		sounds.click2.play();
	},
	playClick3() {
		sounds.click3.play();
	},
	playClick4() {
		sounds.click4.play();
	},
	playClick5() {
		sounds.click5.play();
	},
	playClick6() {
		sounds.click6.play();
	},

	playUpgrade() {
		sounds.upgrade.play();
	},

	playFart() {
		sounds.fart.play();
	},

	setMuted(muted: boolean) {
		Howler.mute(muted);
	},

	setVolume(volume: number) {
		Howler.volume(Math.max(0, Math.min(1, volume)));
	},
};
