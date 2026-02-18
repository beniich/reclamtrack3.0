#!/usr/bin/env node

/**
 * Security Routes Migration Script
 *
 * This script helps migrate security routes to use the new standardized
 * response helpers and centralized middleware.
 *
 * Usage: node migrate-routes.js
 */

const fs = require('fs');
const path = require('path');

// List of routes to migrate
const routesToMigrate = [
  '/sessions/rdp',
  '/gpo',
  '/powershell',
  '/compliance',
  '/pfsense/connect',
  '/pfsense/rules',
  '/pfsense/logs',
  '/pfsense/interfaces',
  '/pfsense/system',
  '/pfsense/traffic',
  '/secrets (GET)',
  '/secrets (POST)',
  '/secrets/:id/reveal',
  '/secrets/:id (DELETE)',
  '/secrets/stats',
];

console.log('🔄 Security Routes Migration Tool\n');
console.log('Routes to migrate:');
routesToMigrate.forEach((route, idx) => {
  console.log(`  ${idx + 1}. ${route}`);
});

console.log('\n📝 Migration Pattern:');
console.log(`
Before:
  try {
    const organizationId = (req as any).organizationId;
    const data = await service.getData(organizationId);
    res.json({
      success: true,
      data: data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }

After:
  try {
    const organizationId = req.organizationId;

    if (!organizationId) {
      return errorResponse(res, 'Organization ID manquant', 400, ErrorCodes.ORG_CONTEXT_MISSING);
    }

    const data = await service.getData(organizationId);
    return successResponse(res, data);
  } catch (error: any) {
    console.error('[Route Name] Error:', error);
    return errorResponse(res, error.message, 500, ErrorCodes.INTERNAL_ERROR);
  }
`);

console.log('\n✅ What has been done:');
console.log('  1. Created centralized security middleware');
console.log('  2. Created API response helpers');
console.log('  3. Created security services index');
console.log('  4. Migrated /audit/passwords route');

console.log('\n⏳ Next steps:');
console.log('  1. Manually migrate remaining routes using the pattern above');
console.log('  2. Update other route files (devops.ts, complaints.ts, auth.ts)');
console.log('  3. Test all endpoints');
console.log('  4. Update frontend API calls if needed');

console.log('\n💡 Tips:');
console.log('  - Use successResponse() for successful operations');
console.log('  - Use errorResponse() with appropriate HTTP status codes');
console.log('  - Always validate req.organizationId before using it');
console.log('  - Add console.error() for better debugging');
console.log('  - Use ErrorCodes constants for consistency');

console.log('\n📚 Documentation:');
console.log('  - See artifacts/backend_harmonization_report.md for details');
console.log('  - See artifacts/security_harmonization_plan.md for overall plan');

console.log('\n🚀 Ready to continue migration!\n');
