export interface GameState {
	currency: number;
	totalClicks: number;

	clickPower: number;
	autoIncome: number;

	catMintDuration: number; // секунд
	catMintEndsAt: number; // timestamp ms; 0 / в прошлом = неактивно

	clickUpgradeCost: number;
	autoUpgradeCost: number;
	catMintUpgradeCost: number;
}
