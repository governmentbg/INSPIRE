﻿class GDPR {

    private gdpr_link: string = "#";
    private gdpr_link2: string = "#";

    constructor() {
        this.init();
    }

    public check = () => {
        const self = this;
        const gdpr_htmlstring =
            `<div id="gdpr_wrapper"><div class="center"><p class="gdpr_rm">${resources.CookiesMessage} <a href="${self.gdpr_link
                }" style="color:#fff; text-decoration: underline;"><em>${resources.PersonalDataPoliticsMessage
                }</em></a> ${resources.And} <a href="${self.gdpr_link2
                }"  style="color:#fff;text-decoration: underline;"><em>${resources.GeneralTermsMessage
                }</em></a></p><div class="gdpr_bttns"><a id="gdpr_agree" href="#" class="bttn main" >${resources
                .ReadAndAcceptMessage}</a></div></div>`;

        if ($("#privacystate").length) {
            $("#privacystate h2")
                .after(`&nbsp;<br><a href="#" class="gdpr_disagree">${resources.RemoveCookiesMessage}</a>`);
            $("#privacystate h2")
                .after(`&nbsp;<div class="success privacybtn" >${resources.ReadAndAcceptConditions}</div>`);
            $("#privacystate .privacybtn2").remove();
            let status: string;
            if (self.getCookie("cookiesgdpr")) {
                switch (self.getCookie("cookiesgdpr")) {
                case "true":
                    status = `<div class="note">${resources.AcceptedCookiesMessage}</div>`;
                    break;
                case "false":
                    status = `<div class="note">${resources.DeclinedCookiesMessage}</div>`;
                    break;
                }
            } else {
                status = `<div class="note">${resources.NotAcceptedYetCookiesMessage}</div>`;
            }
            $("#privacystate h2").append(status);
        }

        if (!self.getCookie("cookiesgdpr")) {
            $("header").before(gdpr_htmlstring);
        }
    };

    private init = () => {
        const self = this;
        $(document).ready(() => {
            core.rebindEvent("click", "#gdpr_agree,.gdpr_agree,.privacybtn1,.success.privacybtn", self.onGdprAgree);
            core.rebindEvent("click", "#gdpr_disagree, .gdpr_disagree", self.onGdprDisagree);
            core.rebindEvent("click", "#gdpr_close, .gdpr_close", self.onGdprClose);
        });
    };

    private onGdprClose = (e) => {
        const self = this;
        e.preventDefault();
        self.setCookie("cookiesgdpr", "false", 0.04166666);
        $("#gdprconsent").fadeOut(200);
    };

    private onGdprDisagree = (e) => {
        const self = this;
        e.preventDefault();
        self.removeCookies();
        self.setCookie("cookiesgdpr", "false", 0.0416666);
        $("#gdprconsent").fadeOut(200);
        setTimeout(function () {
            this.window.location = self.gdpr_link;
        },
            200);
    };

    private onGdprAgree = (e) => {
        const self = this;
        e.preventDefault();
        self.setCookie("cookiesgdpr", "true", 365);
        $("#gdprconsent").fadeOut(200);
        window.location.reload();
    };

    private setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = `expires=${d}`;
        document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
    };

    private getCookie = (cname) => {
        const name = cname + "=";
        const ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    };

    private removeCookies = () => {
        document.cookie.split(";").forEach(
            function (c) {
                document.cookie =
                    c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            }
        );
    };
}

let gdpr = new GDPR();