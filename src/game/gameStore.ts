import { createStore, produce, type SetStoreFunction, type Store } from 'solid-js/store';
import { makePersisted } from '@solid-primitives/storage';

import type { GameState } from './gameTypes';

const STORAGE_KEY = 'clicker-save';

const initialState: GameState = {
	currency: 0,
	totalClicks: 0,

	clickPower: 1,
	kolbaskiPower: 5,
	autoIncome: 0,
	catMintDuration: 30,
	catMintEndsAt: 0,

	clickUpgradeCost: 10,
	kolbaskiUpgradeCost: 50,
	autoUpgradeCost: 50,
	catMintUpgradeCost: 250,
};

// Validate loaded numeric values
const readNumber = (value: unknown, fallback: number): number =>
	typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : fallback;

// Deserialize and validate saved data
const deserializeGameState = (value: string): GameState => {
	try {
		const parsed: unknown = JSON.parse(value);

		if (typeof parsed !== 'object' || parsed === null) {
			return { ...initialState };
		}

		const data = parsed as Record<string, unknown>;

		return {
			currency: readNumber(data.currency, 0),

			totalClicks: Math.floor(readNumber(data.totalClicks, 0)),

			clickPower: Math.max(1, readNumber(data.clickPower, 1)),
			kolbaskiPower: Math.max(5, readNumber(data.kolbaskiPowerCost, 5)),

			autoIncome: readNumber(data.autoIncome, 0),

			catMintDuration: readNumber(data.catMintDuration, 30),

			catMintEndsAt: readNumber(data.catMintEndsAt, 0),

			clickUpgradeCost: Math.max(1, readNumber(data.clickUpgradeCost, 10)),

			kolbaskiUpgradeCost: Math.max(1, readNumber(data.kolbaskiUpgradeCost, 75)),

			autoUpgradeCost: Math.max(1, readNumber(data.autoUpgradeCost, 50)),

			catMintUpgradeCost: Math.max(1, readNumber(data.catMintUpgradeCost, 250)),
		};
	} catch {
		return { ...initialState };
	}
};

// makePersisted loses the precise setter type — restore it once, here.
type PersistedGameStore = [Store<GameState>, SetStoreFunction<GameState>];

export const createGameStore = () => {
	const [state, setState] = makePersisted(createStore<GameState>({ ...initialState }), {
		name: STORAGE_KEY,
		deserialize: deserializeGameState,
	}) as PersistedGameStore;

	const isCatMintActive = (): boolean => state.catMintEndsAt > Date.now();

	// Click action
	const click = (): void => {
		setState(
			produce((s: GameState) => {
				s.currency += s.clickPower;
				s.totalClicks += 1;
			}),
		);
	};

	// Buy click upgrade
	const buyClickUpgrade = (): boolean => {
		if (state.currency < state.clickUpgradeCost) return false;

		setState(
			produce((s: GameState) => {
				s.currency -= s.clickUpgradeCost;
				s.clickPower += 1;
				s.clickUpgradeCost = Math.ceil(s.clickUpgradeCost * 1.5);
			}),
		);

		return true;
	};
	const buyKolbaskiUpgrade = (): boolean => {
		if (state.currency < state.kolbaskiUpgradeCost) return false;

		setState(
			produce((s: GameState) => {
				s.currency -= s.kolbaskiUpgradeCost;
				s.clickPower += 5;
				s.kolbaskiUpgradeCost = Math.ceil(s.kolbaskiUpgradeCost * 2);
			}),
		);

		return true;
	};

	// Buy passive income upgrade
	const buyAutoUpgrade = (): boolean => {
		if (state.currency < state.autoUpgradeCost) return false;

		setState(
			produce((s: GameState) => {
				s.currency -= s.autoUpgradeCost;
				s.autoIncome += 1;
				s.autoUpgradeCost = Math.ceil(s.autoUpgradeCost * 1.7);
			}),
		);

		return true;
	};

	// Buy 2x cat-mint buff for 30s
	const buyCatMintUpgrade = (): boolean => {
		if (isCatMintActive()) return false;
		if (state.currency < state.catMintUpgradeCost) return false;

		setState(
			produce((s: GameState) => {
				s.currency -= s.catMintUpgradeCost;
				s.catMintEndsAt = Date.now() + s.catMintDuration * 1000;
				s.catMintUpgradeCost = Math.ceil(s.catMintUpgradeCost * 2);
			}),
		);

		return true;
	};

	// Generate passive income (x2 while cat-mint is active)
	// Generate passive income — caller controls frequency (see component)
	const addPassiveIncome = (): void => {
		if (state.autoIncome <= 0) return;

		setState(
			produce((s: GameState) => {
				s.currency += s.autoIncome;
			}),
		);
	};

	// Reset progress
	const reset = (): void => setState({ ...initialState });

	return {
		state,
		isCatMintActive,
		click,
		buyClickUpgrade,
		buyAutoUpgrade,
		buyCatMintUpgrade,
		addPassiveIncome,
		reset,
		buyKolbaskiUpgrade,
	};
};
