---
layout: docs_page
title: Add User Consent to Your Auth Flow
excerpt: Add a user consent to your authentication or authorization flow
---
# Add Okta's User Consent Dialog to Your Auth Flow

{% api_lifecycle ea %}

To configure an authorization or authentication flow to include a user consent page, you'll need to configure settings in three places:

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

4. Prepare an authentication or authorization request with the correct values for `prompt` and  * `consent_method`:

5. Test your configuration by sending an authentication or authorization request:

```json
xxx
```

## Resources

* [User Consent overview](xx)
* [API Details](/docs/api/resources/apps#settings-7)