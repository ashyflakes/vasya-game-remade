export interface GameState {
	currency: number;
	totalClicks: number;

	clickPower: number;
	kolbaskiPower: number;
	autoIncome: number;

	catMintDuration: number; // секунд
	catMintEndsAt: number; // timestamp ms; 0 / в прошлом = неактивно

	clickUpgradeCost: number;
	kolbaskiUpgradeCost: number;
	autoUpgradeCost: number;
	catMintUpgradeCost: number;
}
