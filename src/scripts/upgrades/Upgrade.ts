///<reference path="../GameConstants.ts"/>
///<reference path="Cost.ts"/>
///<reference path="CostFactory.ts"/>

class Upgrade {
    name: any;
    displayName: string;
    maxLevel: number;
    _level: KnockoutObservable<number> = ko.observable();

    // Optional array of costs
    costList: Cost[] = [];
    // Optional array of benefits
    bonusList: number[] = [];

    constructor(name: any, displayName: string, maxLevel: number, costList: Cost[], bonusList: number[]) {
        this.name = name;
        this.displayName = displayName;
        this.maxLevel = maxLevel;
        this.level = 1;
        this.costList = costList;
        this.bonusList = bonusList;
    }

    calculateCost(): Cost {
        return this.costList[this.level];
    }

    // Override with a custom function
    calculateBonus(): number {
        return this.bonusList[this.level];
    }

    upgradeBonus() {
        if (!this.isMaxLevel()) {
            return this.bonusList[this.level + 1] - this.bonusList[this.level];
        }
        return 0;
    }

    isMaxLevel() {
        return this.level >= this.maxLevel;
    }

    canAfford(): boolean {
        return player.canAfford(this.calculateCost());
    }

    // Override in subclass when other requirements exist.
    canBuy(): boolean {
        return this.level < this.maxLevel && this.canAfford();
    }

    buy() {
        if (this.canBuy()) {
            player.payCost(this.calculateCost());
            this.levelUp();
        }
    }

    levelUp() {
        this.level = this.level + 1;
    }

    // Knockout getters/setters
    get level(): number {
        return this._level();
    }

    set level(value) {
        this._level(Math.min(value, this.maxLevel));
    }

}