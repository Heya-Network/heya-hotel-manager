export class JwtRequestDto {
    user: {
        sub: number;
        roles: string[];
        email: string;
        polkadotSs58?: string;
        metamaskHex?: string;
        properties: number[];
    };
}
