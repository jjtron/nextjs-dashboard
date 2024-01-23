## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

POSTGRESQL: 
    Installed locally with BREW,
    resulting in the following notes at the end of the install process . . .

    ==> postgresql@15
    This formula has created a default database cluster with:
    initdb --locale=C -E UTF-8 /usr/local/var/postgresql@15
    For more details, read:
    https://www.postgresql.org/docs/15/app-initdb.html

    postgresql@15 is keg-only, which means it was not symlinked into /usr/local,
    because this is an alternate version of another formula.

    If you need to have postgresql@15 first in your PATH, run:
    echo 'export PATH="/usr/local/opt/postgresql@15/bin:$PATH"' >> /Users/jjtron/.bash_profile

    For compilers to find postgresql@15 you may need to set:
    export LDFLAGS="-L/usr/local/opt/postgresql@15/lib"
    export CPPFLAGS="-I/usr/local/opt/postgresql@15/include"

    For pkg-config to find postgresql@15 you may need to set:
    export PKG_CONFIG_PATH="/usr/local/opt/postgresql@15/lib/pkgconfig"

    To start postgresql@15 now and restart at login:
    brew services start postgresql@15
    Or, if you don't want/need a background service you can just run:
    LC_ALL="C" /usr/local/opt/postgresql@15/bin/postgres -D /usr/local/var/postgresql@15

END POSTGRESQL: 
