---
layout: blog_post
title: "User Consent in Okta"
author: mysti
description: "This post helps you understand what user consent is, and how to use it in an OpenID Connect authentication flow in Okta."
tags: [oauth, oauth2, oauth2.0, oauth 2.0, OpenID, OpenID Connect, oidc, consent, user consent]
---

Browse any newspaper, Twitter feed or magazine and you'll read something about users who didn't realize how much information they were giving to a web app.
To avoid these problems, you want your app to make it easy for users to access the resources they need, and also keep them informed about what they are agreeing to share.

# What is Consent?

Have you ever logged into a web app using Google login?

{% img dropbox-user-consent.png alt:"dropbox login with google dialog" %}

When you first click the **Continue with Google** login button, Google prompts you to allow it to access information or to give it permission to do other things before you can access the web app that you are logging into.

{% img dropbox-consent2.png alt:"dropbox login consent dialog" %}

This dialog is asking the user to allow Dropbox to access the user's Google contacts. This happens as part of an OpenID Connect consent flow, commonly called user consent.

> OpenID Connect is an authentication layer on top of OAuth 2.0, which is an authorization framework. Okta is [certified](http://openid.net/certification/) as compliant with the OpenID Connect spec. Read more about Okta and OpenID Connect in the [Okta standards documentation](/standards/OIDC/).

# What is Okta?

Okta provides secure connections between people and technology. For example, Okta manages single sign-on: an employee logs in once and gets instant access to all his or her apps. With Okta, you can manage every user, app, device, and API in your organization. Okta helps you prevent data breaches and provide users with personalized and inherently secure applications.

Using Okta API Products, you can ensure that every user has a chance to give consent when one app or service wants to access the user's resources in another app or service.

# How Okta Does Consent

If you use Okta to manage your user's connections to resources (apps, APIs, or other services) you can take advantage of Okta's user consent feature.

Okta can display a user consent dialog that you can trigger from authentication or authorization flows for OAuth 2.0 or OpenID Connect. Okta hosts this dialog and populates it with a list of permissions (scopes in OpenID Connect parlance) and optionally, links to your terms of service and policy documents.

{% img user-consent-howto.png alt:"user-consent-dialog" %}

When a user grants their consent in this dialog, they are giving explicit permission to allow an app or service to access resources protected by scopes. Okta keeps track of all the grants that a user has given. Consent grants remain valid until the user manually revokes them, or until the user, application, authorization server or scope is deactivated or deleted.

Inserting a user consent dialog in your OpenID Connect authentication flow is easy: just set a few configuration values in Okta, then send a request to the Okta API to see the user consent dialog in action.

> If you are new to authentication or Okta, you can sign up for a free developer org, download our authentication Postman collections and experiment with sending authentication requests before diving into the next section. Just visit Okta's [Getting Started](/docs/api/getting_started/api_test_client) site.

# Setting Up User Consent in Okta

Okta provides an authorization server to manage access to resources, per the [OpenID Connect](http://oauth.net/documentation) and [OAuth 2.0](http://openid.net/connect/) specifications. You'll need to configure some options in the authorization server.

1. Verify that you have the API Access Management feature enabled, and that User Consent is also enabled. If both features are enabled, you'll see a **User Consent** panel in the General tab for any OpenID Connect app.

    {% img user-consent-panel.png alt:"User Consent Panel" %}

    To enable these features, {{site.contact_support_lc}}.

2. If you are using the Developer Console, switch to Classic UI for this tutorial. 

3.  Click the **Admin** button, then Select **Applications > Add Application > Create New App**.

    {% img user-consent-blog-add-app.png alt:"new app wizard" %}

4. Choose **Single Page App (SPA)** for the platform and **OpenID Connect** for the Sign on method and choose **Create**.

    {% img user-consent-blog-oidc-details.png alt:"oidc app details" %}

5. Enter an application name and any valid URI for the **Login redirect URIs** (we won't use it, but the field requires a valid value).

6. Your new test app is displayed. You should see sections for Application, User Consent, and Login.

    {% img user-consent-blog-general-settings.png alt:"OIDC general settings" %}

    Choose **Edit** and change the following values:

    In the **Allowed grant types** section, select **Implicit (Hybrid)**. Also select **Allow ID Token with implicit grant type**, which is displayed once you slect the implicit grant type.

    In the **User consent** section, check that **Require consent** is checked.

    Optionally, if you have a URI for terms of service, policy, or a logo that should show up in the user consent dialog, add them.

7. Choose **Save** and open the Assignments tab. The app must be assigned to at least one person. We'll assign it to everyone to make it easy. Choose **Assign > Assign to Groups** and click the **Assign** button next to **Everyone**.

8. Now, configure your default authentication server (or any other Okta authorization server in this org). Navigate to **Security > API** and select the Authorization Servers tab. Click **default** or the name of the authorization server you'll use in the authentication request to open the tabs for that server.

9. In the Scopes tab, find the `email` scope. If **User Consent** shows **No**, click the pencil and change the value to Yes.

10. In the Access Policies tab, crate a new access policy. Click **Add New Access Policy** and supply a name, description, and choose **All clients** in the **Assign to** section, and click **Create Policy. In a production environment, of course, you'd choose which clients should use the policy.

11. Make sure you've selected the policy you just created (if you have more than one), and click **Add Rule**. You can accept all defaults, but make sure that in the **Scopes requested** section, select **The following scopes** and specify `email` and `openid` (type in the first few letters of each to select). All the OpenID Connect default scopes like email must also include `openid`.

12. Test your configuration by sending an authentication or authorization request. For example, to require consent for the default scope `email` issue a request similar to the following (values for `redirect_uri`, `state`, and `nonce` aren't used in this example but are usually used in production requests).

```json
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token} \
"https://${yourOktaDomain}.com/oauth2/${authenticationServerId}/v1/authorize?client_id=${clientId}&response_type=token&response_mode=fragment&scope=email&redirect_uri=http://localhost:54321&state=myState&nonce=${nonce}"
```
Your test should launch the user consent dialog that similar to the following consent dialog.

{% img user-consent-no-openid.png alt:"user-consent-dialog-final" %}

Click **Allow** to create the grant.

## Verification

If you want to verify that you've successfully created a user grant, list the grants:

```json
curl -v -X GET \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "Authorization: SSWS ${api_token} \
"https://${yourOktaDomain}.com/api/v1/users/${userId}/grants"
```
The response should contain the grant you created when you clicked **Allow Access** in the previous step.

```json
[
    {
        "id": "oag4xfx62r6S53kHr0h6",
        "status": "ACTIVE",
        "created": "2018-04-23T21:53:25.000Z",
        "lastUpdated": "2018-04-23T21:53:25.000Z",
        "issuerId": "auscl1o4tnf48w5Wt0h7",
        "issuer": null,
        "clientId": "xfnIflwIn2TkbpNBs6JQ",
        "userId": "00u5t60iloOHN9pBi0h7",
        "scopeId": "scpcl1o4toFjganq10h7",
        "_links": {
            "app": {
                "href": "https://${yourOktaDomain}.com/api/v1/apps/0oaaggpxeqxTDuP780h7",
                "title": "Acme OIDC Client"
            },
            "authorizationServer": {
                "href": "https://${yourOktaDomain}.com/api/v1/authorizationServers/auscl1o4tnf48w5Wt0h7",
                "title": "My Authorization Server"
            },
            "scope": {
                "href": "https://${yourOktaDomain}.com/api/v1/authorizationServers/auscl1o4tnf48w5Wt0h7/scopes/scpcl1o4toFjganq10h7",
                "title": "openid"
            },
            "self": {
                "href": "https://${yourOktaDomain}.com/api/v1/users/00u5t60iloOHN9pBi0h7/grants/oag4xfx62r6S53kHr0h6"
            },
            "revoke": {
                "href": "https://${yourOktaDomain}.com/api/v1/users/00u5t60iloOHN9pBi0h7/grants/oag4xfx62r6S53kHr0h6",
                "hints": {
                    "allow": [
                        "DELETE"
                    ]
                }
            },
            "client": {
                "href": "https://${yourOktaDomain}.com/oauth2/v1/clients/xfnIflwIn2TkbpNBs6JQ",
                "title": "Acme OIDC Client"
            },
            "user": {
                "href": "https://${yourOktaDomain}.com/api/v1/users/00u5t60iloOHN9pBi0h7",
                "title": "Saml Jackson "
            },
            "issuer": {
                "href": "https://${yourOktaDomain}.com/api/v1/authorizationServers/auscl1o4tnf48w5Wt0h7,
                "title": "My Authentication Server"
            }
        }
    }
]
```

## Troubleshooting

If you don't see the consent prompt when expected:

* Verify that you haven't already provided consent for that combination of app and scope(s). Use the [`/grants` endpoint](/docs/api/resources/users#list-grants) to see which grants have been given, and to revoke grants.
* Make sure that in your app configuration, the `redirect_uri` is an absolute URI and that it is whitelisted by specifying in Trusted Origins.
* Check that you've created at least one policy with one rule that applies to any scope or the scope(s) in your test.

## What to Try Next

Once you get comfortable setting up user consent dialogs, you can experiment with creating different configurations for different apps. Different authorization server policies and rules can control what happens for different client apps in different situations.

If you want to read more about user consent and Okta, visit the [developer documentation](/docs/how-to/add-user-consent-to-flow), which discusses how to set up user consent using the Okta API.

Implementing the user consent dialog in Okta ensures that your users understand what they are sharing when they connect to an app. This is especially important if an app is consuming information stored in the users profile. Custom scopes as well as the default scopes can be specified, and can be used both with ID tokens and access tokens.