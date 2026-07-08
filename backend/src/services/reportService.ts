/**
 * @file reportService.ts
 * @description Service for generating Excel (XLSX) and PDF reports.
 *              Uses exceljs (already a dependency) for XLSX export
 *              and jspdf-compatible JSON structures for client-side rendering.
 * @module backend/services
 */

import ExcelJS from 'exceljs';
import type { Response } from 'express';
import { logger } from '../utils/logger.js';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ReportFilter {
  organizationId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  priority?: string;
  teamId?: string;
}

export interface ComplaintReportRow {
  id: string;
  title: string;
  status: string;
  priority: string;
  category: string;
  createdAt: Date;
  resolvedAt?: Date;
  resolutionTimeHours?: number;
  assignedTo?: string;
}

export interface SLAReportRow {
  month: string;
  total: number;
  resolved: number;
  resolutionRate: number;
  avgResolutionHours: number;
  slaBreaches: number;
}

// ─── XLSX Generation ─────────────────────────────────────────────────────────

/**
 * Generate and stream an XLSX complaints report to the response.
 */
export const generateComplaintsXLSX = async (
  res: Response,
  rows: ComplaintReportRow[],
  title = 'Rapport des Réclamations',
): Promise<void> => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'ReclamTrack';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Réclamations', {
    pageSetup: { paperSize: 9, orientation: 'landscape' },
  });

  // ── Header styling
  const headerFill: ExcelJS.Fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1E3A5F' },
  };
  const headerFont: Partial<ExcelJS.Font> = {
    bold: true,
    color: { argb: 'FFFFFFFF' },
    size: 11,
  };

  // ── Column definitions
  sheet.columns = [
    { header: 'ID', key: 'id', width: 28 },
    { header: 'Titre', key: 'title', width: 40 },
    { header: 'Statut', key: 'status', width: 15 },
    { header: 'Priorité', key: 'priority', width: 12 },
    { header: 'Catégorie', key: 'category', width: 20 },
    { header: 'Créé le', key: 'createdAt', width: 20 },
    { header: 'Résolu le', key: 'resolvedAt', width: 20 },
    { header: 'Délai résolution (h)', key: 'resolutionTimeHours', width: 22 },
    { header: 'Assigné à', key: 'assignedTo', width: 25 },
  ];

  // Apply header styles
  const headerRow = sheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = headerFill;
    cell.font = headerFont;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      bottom: { style: 'thin', color: { argb: 'FFB0B0B0' } },
    };
  });
  headerRow.height = 24;

  // ── Title row (inserted above header)
  sheet.spliceRows(1, 0, [title]);
  const titleRow = sheet.getRow(1);
  sheet.mergeCells(1, 1, 1, 9);
  const titleCell = titleRow.getCell(1);
  titleCell.value = title;
  titleCell.font = { bold: true, size: 14, color: { argb: 'FF1E3A5F' } };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  titleRow.height = 32;

  // ── Data rows
  rows.forEach((row, idx) => {
    const dataRow = sheet.addRow({
      ...row,
      createdAt: row.createdAt ? new Date(row.createdAt).toLocaleDateString('fr-FR') : '',
      resolvedAt: row.resolvedAt ? new Date(row.resolvedAt).toLocaleDateString('fr-FR') : '—',
      resolutionTimeHours: row.resolutionTimeHours?.toFixed(1) ?? '—',
    });

    // Alternate row coloring
    if (idx % 2 === 0) {
      dataRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF5F7FA' },
        };
      });
    }
  });

  // ── Auto-filter on header row (now row 2)
  sheet.autoFilter = { from: 'A2', to: 'I2' };

  // ── Summary row
  const summaryRow = sheet.addRow([`Total: ${rows.length} réclamations`]);
  summaryRow.font = { bold: true, italic: true };

  // ── Stream response
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="reclamations-${Date.now()}.xlsx"`);

  await workbook.xlsx.write(res);
  logger.info(`[ReportService] XLSX report generated: ${rows.length} rows`);
};

/**
 * Generate and stream an XLSX SLA report.
 */
export const generateSLAReportXLSX = async (
  res: Response,
  rows: SLAReportRow[],
): Promise<void> => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'ReclamTrack';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Rapport SLA');

  sheet.columns = [
    { header: 'Mois', key: 'month', width: 15 },
    { header: 'Total', key: 'total', width: 10 },
    { header: 'Résolus', key: 'resolved', width: 12 },
    { header: 'Taux résolution (%)', key: 'resolutionRate', width: 22 },
    { header: 'Délai moyen (h)', key: 'avgResolutionHours', width: 18 },
    { header: 'Violations SLA', key: 'slaBreaches', width: 16 },
  ];

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1E3A5F' },
  } as ExcelJS.Fill;
  headerRow.height = 22;

  rows.forEach((row) => {
    sheet.addRow({
      ...row,
      resolutionRate: `${row.resolutionRate.toFixed(1)}%`,
      avgResolutionHours: row.avgResolutionHours.toFixed(1),
    });
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="sla-report-${Date.now()}.xlsx"`);

  await workbook.xlsx.write(res);
  logger.info(`[ReportService] SLA XLSX report generated: ${rows.length} months`);
};

/**
 * Build a JSON summary report suitable for sending to frontend for jsPDF rendering.
 */
export const buildJSONReport = (
  title: string,
  data: Record<string, unknown>[],
  meta: Record<string, unknown>,
): Record<string, unknown> => ({
  title,
  generatedAt: new Date().toISOString(),
  meta,
  data,
});
