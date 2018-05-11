---
layout: docs_page
weight: 3
title: Client Context
redirect_from:
  - "/docs/getting_started/design_principles.html#client-request-context"
---

# Client Request Context

Request context is used to evaluate policies such as **Okta Sign-On Policy** and provide client information for [troubleshooting and auditing](/docs/api/resources/events#client-objecttype) purposes, and as part of authentication and authorization.

Okta communicates the client request context in one of three ways:

* [The embedded context for a request is defined in the `stateToken`.](#state-token)
* [A JavaScript object containing the request context is passed into a custom HTML template so that you can build custom, app-specific experiences.](#javascript-object)
* [The `User-Agent` HTTP header.](#user-agent-http-header)

## State Token

If an authentication request is triggered by an app access request, the login page (Sign-in Widget or custom hosted login page) is always rendered with a `stateToken` that has an embedded context for the request. For details, see [SP-initiated Step-up Authentication](/docs/api/resources/authn#sp-initiated-step-up-authentication).

**I think this might be backwards? Aren't we passing the stateToken *to* the login page? Or choosing the login page based on the state token?**

The state token always has the user and which app **(it is headed for? it came from?)**

**Do we want a short how-to article in the how-to section? The /authn doc is already written?**

## JavaScript Object

**????**

## User-Agent HTTP Header

Okta supports the standard `User-Agent` HTTP header to identify the user's browser or application. Always send a `User-Agent` string to uniquely identify your client application and version such as `Oktaprise/1.1`.

> If your application is acting as a gateway or proxy, you should forward the `User-Agent` of the originating client with your API requests. <!-- repeated in design_principles.md -->