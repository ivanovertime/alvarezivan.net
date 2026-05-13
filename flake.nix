{
  description = "Nix development environment for alvarezivan.net (Nuxt 4 + pnpm)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
            pnpm
            git
            python3
            pkg-config
            gnumake
            gcc
          ];

          shellHook = ''
            export PNPM_HOME="$PWD/.pnpm-home"
            export PATH="$PNPM_HOME:$PATH"

            echo "Nix dev shell ready (Node $(node --version))"
            echo "Run: pnpm install"
          '';
        };

        formatter = pkgs.nixfmt-rfc-style;
      });
}
