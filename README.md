# Anechoic Station Berlin

## Context

- Here is a personal project related to sound engineering. I am currently building a anechoic chamber in a Soviet bunker somewhere in Berlin.
- This room is going to be used to make electroacoustic measurements on sound systems in order to help people design better cabinets...
- This application is going to process all data recorded from this room:
  - Impulse response
  - Frequency response
  - Impedance response

## Overview

- This application use the Inversion of Control design pattern provided by the InversifyJS container.
- This application follows the Hexagonal Architecture pattern introduced by Alistair Cockburn in 2005, segregating the application & adapter throught different ports.
- This application is decoupled throught 7 different entities:
  - Owner
  - Cabinet
  - Driver
  - Frequency
  - Impulse
  - Impedance
  - Shared

The documentaton of this project is going to be improved later because the priority at the moment is to finish building this room. More information is going to be displayed, such as a web application made by NextJS
