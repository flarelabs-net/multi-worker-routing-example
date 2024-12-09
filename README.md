# multi-worker-routing-example

Requests where the URL pathname starts with `/worker-b/` go to `worker-b`. Else they go to `worker-a`.

> [!NOTE]
> The behaviour in this example would be the same if `some-plugin` was omitted. It is included to demonstrate the approach if another plugin needs to own the middleware.
