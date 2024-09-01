export interface ChartDataItem {
    label: string;
    data: number[];
}
  
export interface EnergyData {
    totalConsumption: number;
    totalCost: number;
    labels: string[];
    chartData: ChartDataItem[];
}
export interface WaterLevelData {
    labels: string[];
    chartData: ChartDataItem[];
}

export interface AbnormalDataType {
  item: string;
  status: boolean;
  type: string;
  date: string;
}

export const BAR_CHART_OPTIONS = {
    plugins: {
      tooltip: { enabled: true },
      legend: {
        display: true
      },
      datalabels: { display: false }
    },
    scales: {
      x: { ticks: { font: { size: 11 } } },
      y: { ticks: { font: { size: 11 } } }
    },
    responsive: true,
    maintainAspectRatio: false
};

export interface CarbonRangeType {
  min: number;
  max: number;
}

export interface CarbonCategoryType {
    low: CarbonRangeType;
    medium: CarbonRangeType;
    high: CarbonRangeType;
}

export interface CarbonDataType {
  percentage: number;
  carbonData: {
    categories: CarbonCategoryType
  };
}
