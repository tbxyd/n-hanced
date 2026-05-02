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
                } else if ((input.field && m.fieldCDcycle < m.cycle)) { //not hold but field button is pressed
                    if (m.energy > m.fieldRegen) 
                    m.energy -= m.fieldRegen;
                    m.grabPowerUp();
                    m.lookForPickUp();
                    m.drawField();
                    m.pushMobsFacing();
                } else if (m.holdingTarget && m.fieldCDcycle < m.cycle) { //holding, but field button is released
                    m.pickUp();
                } else {
                    m.holdingTarget = null; //clears holding target (this is so you only pick up right after the field button is released and a hold target exists)
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
