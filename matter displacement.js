javascript:(function(){
    const e = {
        name: "matter displacement",
        description: `use <strong class='color-f'>energy</strong> to <strong>teleport</strong> to mouse position<br>use excess <strong class='color-f'>energy</strong> to <strong>deflect</strong> mobs<br><strong>6</strong> <strong class='color-f'>energy</strong> per second`,
        effect: () {
            m.fieldMeterColor = "#ff0"
            m.eyeFillColor = m.fieldMeterColor
            m.hold = function () {
                if (m.isHolding) {
                    m.drawHold(m.holdingTarget);
                    m.holding();
                    m.throwBlock();
                } else if ((m.crouch && input.field) && (m.energy > 0.25)) {
                    m.energy -= 0.25
                    m.resetHistory();
                    Matter.Body.setPosition(player, simulation.mouseInGame);
                    Matter.Body.setVelocity(player, { x: 0, y: 0 });
                } else if ((input.field && m.fieldCDcycle < m.cycle)) {
				    if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen
				    m.grabPowerUp();
				    if(typeof m.lookForPickUp == 'function') { //lookForPickUp is changed in newer versions to lookForBlock
					    m.lookForPickUp(); 
				    } else {
					    m.lookForBlock();
				    }
				} else if (m.holdingTarget && m.fieldCDcycle < m.cycle) {
				    m.pickUp();
				} else {
				    m.holdingTarget = null;
				}
				m.drawRegenEnergy()
            }
        },
}
m.fieldUpgrades.push(e);
	const fieldArray = m.fieldUpgrades.filter(
	(obj, index, self) =>
		index === self.findIndex((item) => item.name === obj.name)
	);
m.fieldUpgrades = fieldArray;
})();
