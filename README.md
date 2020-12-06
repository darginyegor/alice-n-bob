# AliceNBob

This app emulates messaging between several (2+) imaginary characters and at the moment fully supports two conversation participants (Alice and Bob by default). The main layout consists of two `MessengerComponent` instances that represent Alice's and Bob's messenger apps. Messaging process is managed by `MessagesService`.

To connect to the service, a messenger client must register itself through the `registerClient()` method providing their name and a function to handle events casted by `messageEmiiter`, to which they will be automatically subscribed. The registration method returns a `MessengerClient` enity that must be used to communicate with the service: push and delete messages.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
