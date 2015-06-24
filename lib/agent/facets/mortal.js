import Facet from '../facet';

var MAX_BASE_HP = 100;

var Mortal = new Facet({
    name: "Mortal",
    attributes: [
        {
            id: "dead",
            type: "boolean",
            initial: false
        }
    ],
    coreStats: [
        {
            id: "hp",
            min: 0,
            max: MAX_BASE_HP,
            initial: MAX_BASE_HP
        }
    ],
    methods: [
        {
            id: "die",
            handler: function () {
                // TODO: set 'dead' attribute to 'true'
                // TODO: set 'hp' core stat value to 0
            }
        }
    ],
    actions: [
        {
            id: 'ko',
            handler: function () {
                // TODO: call die() method
            },
            trigger: {
                // TODO: MIKE: define trigger format
            }
        }
    ]
});

export default Mortal;
