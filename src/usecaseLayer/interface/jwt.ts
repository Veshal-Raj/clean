interface Ijwt {
  createJWT(userId: number, email: string, role: string, name: string): string;
}

export default Ijwt;
