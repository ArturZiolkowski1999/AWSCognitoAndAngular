Potrzeba wrzucić jeszcze folder z environments.
PRzykład konfiguracji w pliku environment.ts
```typescript
    export const environment = {
        production: false,
        cognito: {
            userPoolId: 
            userPoolWebClientId: 
        }
    };
```

npm start

> ng-cognito@0.0.0 start
> ng serve