javascript:(function() {
    const e = {
        name: "melee", //13
        descriptionFunction() {
            return `hold to charge up an attack`
        },
        ammo: 0,
        ammoPack: Infinity,
        defaultAmmoPack: Infinity,
        have: false,
        meleeCharge: 0.6,
        harpoonSize: 1,
        do() {
            if (this.meleeCharge > 0) {
                if ((!input.fire && this.meleeCharge > 0.6)) {
                    const where = {
                        x: m.pos.x + 30 * Math.cos(m.angle),
                        y: m.pos.y + 30 * Math.sin(m.angle)
                    }
                    const closest = {
                        distance: 10000,
                        target: null
                    }
                    //this pushes stuff like railgun
                    const range = 75 + 10 * this.meleeCharge
                    for (let i = 0, len = mob.length; i < len; i++) {
                        //pushes the mobs when firing
                        if (!mod[i].isUnblockable) {
                            const SUB = Vector.sub(mob[i].position, m.pos)
                            const DISTANCE = Vector.magnitude(SUB)
                            if (DISTANCE < range + mob[i].radius) {
                                const DEPTH = 75 + Math.min(range - DISTANCE + mob[i].radius, 100)
                                const FORCE = Vector.mult(Vector.normalise(SUB), 0.0015 * Math.sqrt(DEPTH) * mob[i].mass)
                                mob[i].force.x += FORCE.x;
                                mob[i].force.y += FORCE.y;

                                let dmg = (mob[i].isDropPowerUp ? 350 : 1100) * this.meleeCharge
                                simulation.drawList.push({
                                    x: mob[i].position.x,
                                    y: mob[i].position.y,
                                    radius: Math.log(dmg + 1.1) * 20 * mob[i].damageReduction + 3,
                                    color: 'rgba(24, 24, 24, 0.55)',
                                    time: 15
                                });
                                mob[i].damage(dmg);
                            }
                        }
                    }
                    for (let i = 0, len = body.length; i < len; ++i) { //push away blocks when firing
                        const SUB = Vector.sub(body[i].position, m.pos)
                        const DISTANCE = Vector.magnitude(SUB)
                        if (DISTANCE < range) {
                            const DEPTH = Math.min(range - DISTANCE, 100)
                            const FORCE = Vector.mult(Vector.normalise(SUB), 0.003 * Math.sqrt(DEPTH) * body[i].mass)
                            body[i].force.x += FORCE.x;
                            body[i].force.y += FORCE.y - body[i].mass * simulation.g * 1.5; //kick up a bit to give them some arc
                        }
                    }
                    for (let i = 0, len = powerUp.length; i < len; ++i) { //push away blocks when firing
                        const SUB = Vector.sub(powerUp[i].position, m.pos)
                        const DISTANCE = Vector.magnitude(SUB)
                        if (DISTANCE < range) {
                            const DEPTH = Math.min(range - DISTANCE, 500)
                            const FORCE = Vector.mult(Vector.normalise(SUB), 0.002 * Math.sqrt(DEPTH) * powerUp[i].mass)
                            powerUp[i].force.x += FORCE.x;
                            powerUp[i].force.y += FORCE.y - powerUp[i].mass * simulation.g * 1.5; //kick up a bit to give them some arc
                        }
                    }
                    //draw little dots near the edge of range
                    for (let i = 0, len = 10 + 25 * this.meleeCharge; i < len; i++) {
                        const unit = Vector.rotate({ x: 1, y: 0 }, 6.28 * Math.random())
                        const where = Vector.add(m.pos, Vector.mult(unit, range * (0.6 + 0.3 * Math.random())))
                        simulation.drawList.push({
                            x: where.x,
                            y: where.y,
                            radius: 5 + 12 * Math.random(),
                            color: "rgba(156, 156, 156, 0.35)",
                            time: Math.floor(5 + 35 * Math.random())
                        });
                    }
                    const dir = {
                        x: Math.cos(m.angle),
                        y: Math.sin(m.angle)
                    };
                    for (let i = 0, len = mob.length; i < len; ++i) {
                        if (mob[i].alive && !mob[i].isBadTarget && Matter.Query.ray(map, m.pos, mob[i].position).length === 0 && !mob[i].isInvulnerable) {
                            const dot = Vector.dot(dir, Vector.normalise(Vector.sub(mob[i].position, m.pos))) //the dot product of diff and dir will return how much over lap between the vectors
                            const dist = Vector.magnitude(Vector.sub(where, mob[i].position))
                            if (dist < closest.distance && dot > 0.98 - Math.min(dist * 0.00014, 0.3)) { //target closest mob that player is looking at and isn't too close to target
                                closest.distance = dist
                                closest.target = mob[i]
                            }
                        }
                    }
                    b.harpoon(where, closest.target, m.angle, harpoonSize, false, 35, false, thrust)
                    
                    this.meleeCharge = 0;
                }
            }
        }
    };
    b.guns.push(e);
	const gunArray = b.guns.filter(
	(obj, index, self) =>
		index === self.findIndex((item) => item.name === obj.name)
	);
	b.guns = gunArray;
    
})();