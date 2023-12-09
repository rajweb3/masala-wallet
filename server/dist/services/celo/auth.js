"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOptions = void 0;
const next_auth_1 = __importDefault(require("next-auth"));
const github_1 = __importDefault(require("next-auth/providers/github"));
exports.authOptions = {
    // Configure one or more authentication providers
    providers: [
        (0, github_1.default)({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // ...add more providers here
    ],
    callbacks: {
        jwt({ token, account }) {
            return __awaiter(this, void 0, void 0, function* () {
                // Persist the OAuth access_token to the token right after signin
                if (account) {
                    token.accessToken = account.access_token;
                }
                return token;
            });
        },
        session({ session, token, user, }) {
            return __awaiter(this, void 0, void 0, function* () {
                if (process.env.NEXT_PUBLIC_SOCIAL_CONNECT_PROVIDER === "GITHUB") {
                    const base64Credentials = btoa(`${process.env.GITHUB_ID}:${process.env.GITHUB_SECRET}`);
                    const headers = new Headers({
                        Authorization: `Basic ${base64Credentials}`,
                    });
                    const res = yield fetch(`https://api.github.com/user/${token.sub}`, {
                        headers,
                    });
                    const data = yield res.json();
                    session.username = data.login;
                }
                else if (process.env.NEXT_PUBLIC_SOCIAL_CONNECT_PROVIDER === "TWITTER") {
                    console.log("token", token);
                    console.log("session", session);
                    console.log("user", user);
                }
                session.accessToken = token.accessToken;
                return session;
            });
        },
    },
};
exports.default = (0, next_auth_1.default)(exports.authOptions);
