/**
 * Export utility for VC Scout
 * Handles CSV and JSON exports for company lists
 */

export const exportToCSV = (companies, fileName = 'vc_scout_export') => {
    if (!companies || companies.length === 0) return;

    const headers = ['ID', 'Name', 'Website', 'Sector', 'Stage', 'Funding', 'Location', 'Founded'];
    const rows = companies.map(c => [
        c.id,
        `"${c.name}"`,
        c.website,
        c.sector,
        c.stage,
        c.funding,
        `"${c.location}"`,
        c.founded
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToJSON = (data, fileName = 'vc_scout_export') => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
