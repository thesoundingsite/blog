{
  description = "blog.thesounding.site";

  # Channel tarball rather than github:NixOS/nixpkgs so the flake can be locked
  # from environments where GitHub archive downloads are blocked.
  inputs.nixpkgs.url = "https://channels.nixos.org/nixos-unstable/nixexprs.tar.xz";

  outputs =
    { self, nixpkgs }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in
    {
      # `nix build` produces the rendered site in ./result
      packages = forAllSystems (pkgs: {
        default = pkgs.stdenvNoCC.mkDerivation {
          pname = "blog";
          version = self.shortRev or self.dirtyShortRev or "dev";
          src = self;
          nativeBuildInputs = [ pkgs.zola ];
          # zola builds an HTTP client at startup and panics without a CA bundle.
          SSL_CERT_FILE = "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt";
          buildPhase = "zola build --output-dir $out";
          dontInstall = true;
        };
      });

      # `nix develop` gives a shell with zola; then `zola serve`
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShellNoCC {
          packages = [ pkgs.zola ];
        };
      });

      formatter = forAllSystems (pkgs: pkgs.nixfmt);
    };
}
