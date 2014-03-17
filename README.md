# Holodeck.js *(formerly "Gnome Citadel")*

This is an attempt at building a cloud-based game engine for sandbox environments like Dwarf Fortress, Minecraft and Prison Architect. The goal is to create a simple and extensible framework that makes it a lot easier for anyone with a little JavaScript experience to build simulated worlds.

Development is in very early stages; see roadmap.txt for semi-coherent notes on active work.

## Architecture (subject to change)

The current plan is to use node.js to run the simulation engine. Clients will be built independently of the main engine; the first (and only) planned client will be some sort of HTML5/browser-based application. I anticipate bringing in socket.io once the earliest stage of prototyping is finished. Redis-based persistence will also likely show up at some point.
