---
layout: docs_page
title: Add User Consent to Your Authentication Flow
excerpt: Add a user consent to your authentication or authorization flow
---
# Add Okta's User Consent Dialog to Your Authentication Flow

{% api_lifecycle ea %}

A consent represents a user’s explicit permission to allow an application to access resources protected by scopes. As part of an OAuth 2.0 or OpenID Connect authentication flow, you can prompt the user with a page to approve your app’s access to specified resources.

Consent grants are different from tokens because a consent can outlast a token, and there can be multiple tokens with varying sets of scopes derived from a single consent. When an application comes back and needs to get a new access token, it may not need to prompt the user for consent if they have already consented to the specified scopes. Consent grants remain valid until the user manually revokes them, or until the user, application, authorization server or scope is deactivated or deleted.

To configure an authorization or authentication flow to include a user consent page, you'll need to configure settings in two places:

* The app that displays the user consent page
* At least one scope sent in the authentication or authorization request

Then you'll send the appropriate values for `prompt` as part of the request.

Use the following procedure as a model for displaying the user consent dialog as part of OpenID Connect or OAuth 2.0 requests:

1. Verify that you have the API Access Management feature enabled, and request that User Consent also be enabled. If both features are enabled, you'll see a **User Consent** panel in the General tab for any app.

    {% img user-consent-panel.png alt:"User Consent Panel" %}

    To enable these features, {{site.contact_support_lc}}.

2. Create an app via the Apps API with the appropriate values for these request parameters:
    * `tos_uri`: terms of service URI
    * `policy_uri`: privacy policy URI

    Note: You can also specify these values when you create and configure an app in the administrator UI by navigating to **Applications > [Application Name] > General > User Consent**.

3. [Verify](/docs/api/resources/authorization-servers#create-a-scope) that you have the correct value for `consent` set on the scopes you plan to specify.

    Note: You can also specify these values when you create and configure a scope in the administrator UI. Navigate to **Applications > [Application Name] > General > User Consent** and select **Require user consent for this scope** (it can be overriden by individual apps). 

4. Prepare an authentication or authorization request with the correct values for `prompt` and `consent_method`. For details, see the [API documentation for `prompt`](/docs/api/resources/oidc#parameter-details) and the [table of values relating to consent dialog](/docs/api/resources/apps#settings-7).

5. Test your configuration by sending an authentication or authorization request. For example, to **describe sample behavior--what's the best example to use?**, your authentication request would look like the following example:

```json
add example
```
TODO: Describe success and failure, provide troubleshooting?