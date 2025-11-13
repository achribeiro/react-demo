# Commands to Remove Tracked Files from Git

These commands remove files from git tracking that should be ignored. The files will remain on your local filesystem but will no longer be tracked by git.

## Commands Already Executed

The following commands have already been run:

```bash
# Remove backend vendor directory (Laravel dependencies)
git rm --cached -r backend/vendor/

# Remove backend environment and cache files
git rm --cached backend/.env
git rm --cached backend/bootstrap/cache/packages.php
git rm --cached backend/bootstrap/cache/services.php
git rm --cached backend/storage/logs/laravel.log
```

## Additional Commands (if needed)

If you have other tracked files that should be ignored, run these commands:

```bash
# Remove root .env file (if tracked)
git rm --cached .env

# Remove node_modules (if tracked)
git rm --cached -r node_modules/

# Remove build outputs (if tracked)
git rm --cached -r dist/
git rm --cached -r build/
git rm --cached -r .vite/

# Remove Laravel storage framework files (if tracked)
git rm --cached -r backend/storage/framework/cache/
git rm --cached -r backend/storage/framework/sessions/
git rm --cached -r backend/storage/framework/views/

# Remove PHPUnit cache (if tracked)
git rm --cached backend/.phpunit.result.cache

# Remove log files (if tracked)
git rm --cached *.log
git rm --cached backend/storage/logs/*.log

# Remove OS files (if tracked)
git ls-files | Select-String "\.DS_Store" | ForEach-Object { git rm --cached $_ }
git ls-files | Select-String "Thumbs\.db" | ForEach-Object { git rm --cached $_ }
```

## Next Steps

1. **Review the changes:**
   ```bash
   git status
   ```

2. **Commit the removal:**
   ```bash
   git commit -m "Remove tracked files that should be ignored"
   ```

3. **Verify .gitignore is working:**
   After committing, these files should no longer appear in `git status` even if they exist locally.

## Notes

- The `--cached` flag removes files from git tracking but keeps them on your local filesystem
- Files will be deleted from the repository on the next commit
- The `.gitignore` file will prevent these files from being tracked again in the future
- Make sure to commit the `.gitignore` file along with these removals

