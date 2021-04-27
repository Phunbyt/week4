Dear Decadev,

We have a list of email addresses obtained from various channels for marketing and we're trying to determine the best channel to send these emails.

First, we'd like to analyse the emails and determine which addresses are well-formed and the providers they belong to.

It'll be best to categorize the emails by domain names and specify which are valid or invalid. That would help tell us which channel is more reliable.

### Stretch goal

It would be fantastic if you can also validate the email address to determine if the domain accepts emails.

For example,

```
info@decagon.com.ng
```

is a valid email address but the domain `decagon.com.ng` does not accept emails, so any email sent to it would bounce.

This is because the domain has no valid Mail Exchanger (MX) record listed in its DNS.

```bash
dig MX decagon.com.ng +short +all
```

You can check the `MX` record https://dnslookup.online/

If you're able to do this, you should output only valid emails(well-formed emails with domain accepting emails) to a new file.

All the best.
