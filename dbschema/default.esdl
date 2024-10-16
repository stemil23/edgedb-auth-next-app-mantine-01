using extension auth;

module default {
  scalar type Role extending enum<admin, user>;

  global current_user := (
    assert_single((
      select User
      filter .identity = global ext::auth::ClientTokenIdentity
    ))
  );

  type User {
    required identity: ext::auth::Identity {
      constraint exclusive;
    };
    required name: str;
    email: str {
      constraint exclusive;
    };
  
    userRole: Role {
      default := "user";
    };

    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }

    access policy current_user_has_full_access
      allow all
      using (.id ?= global current_user.id);
    access policy admin_has_full_access
      allow all
      using (global current_user.userRole ?= Role.admin);
    access policy everyone_insert_only
      allow insert;

    access policy admin_full_access
      allow all
      using (global current_user.userRole ?= Role.admin);
    access policy self_full_access
      allow all
      using (global current_user.id ?= .id);
    access policy everyone_read
      allow select;
    access policy allow_insert
      allow insert;

  }

  type Item {
    required name: str;
    required created_by: User {
      default := global current_user;
    }

    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }

    access policy admin_has_full_access
      allow all
      using (global current_user.userRole ?= Role.admin);
    access policy creator_has_full_access
      allow all
      using (.created_by ?= global current_user);
    access policy others_read_only
      allow select, insert;
  }

    type Profile {
    required name: str;
    required created_by: User {
      default := global current_user;
      constraint exclusive;  # Ensures one-to-one relationship
    }

    created: datetime {
      rewrite insert using (datetime_of_statement());
    }
    updated: datetime {
      rewrite insert using (datetime_of_statement());
      rewrite update using (datetime_of_statement());
    }

    required language: str;
    required passport_issuer: str;

    access policy admin_has_full_access
      allow all
      using (global current_user.userRole ?= Role.admin);
    access policy creator_has_full_access
      allow all
      using (.created_by ?= global current_user);
    access policy others_read_only
      allow select;
    access policy allow_delete
      allow delete
      using (.created_by ?= global current_user or global current_user.userRole ?= Role.admin);

    # Constraint to ensure only one profile per user
    constraint exclusive on (.created_by);
  }

}
