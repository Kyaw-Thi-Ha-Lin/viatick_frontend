import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
import {OVERVIEW_DATA} from "../data/data";
import { Button } from "reactstrap";
import { ResponsiveContainer, BarChart, Bar } from "recharts";
import "./styles.css";

const OverviewChart = () => {

    const GeneratePdf = async () => {
        const doc = new jsPDF("p", "px");
        const elements = document.getElementsByClassName("dashboard-report");
        await printPdf({ elements, doc });
        return doc.save(`ESG_Report.pdf`);
    };

    const printPdf = async ({
      elements,
      doc,
    }: {
      elements: HTMLCollectionOf<Element>;
      doc: jsPDF;
    }) => {
      let top = 20;
      const padding = 10;
    
      for (let i = 0; i < elements.length; i++) {
        const elementItem = elements.item(i) as HTMLElement;
        const image = await htmlToImage.toPng(elementItem);
        let elHeight = elementItem.offsetHeight;
        let elWidth = elementItem.offsetWidth;
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth();
    
        if (elWidth > pageWidth) {
          const ratio = pageWidth / elWidth;
          elHeight = elHeight * ratio - padding;
          elWidth = elWidth * ratio - padding;
        }

        doc.addImage(
          image,
          "PNG",
          padding,
          top,
          pageWidth - padding,
          elHeight,
          `image${i}`
        );
        top += elHeight;
      }
    };

    return (
        <div
            style={ {
                width: "60%"
            } }
            className="d-flex flex-column align-items-center justify-content-center ps-20 pe-300">
            <ResponsiveContainer height="60%" width="75%">
                <BarChart height={40} data={OVERVIEW_DATA}>
                <Bar dataKey="consumption" barSize={20} fill="#b80000" />
                </BarChart>
            </ResponsiveContainer>
            <div className="mt-3">
                <Button
                    className="primary-button"
                    size="lg">Overview</Button>
            </div>
            <div className="mt-3">
                <Button
                    outline
                    className="primary-outline-button"
                    onClick={GeneratePdf}
                    size="lg">ESG Readings</Button>
            </div>
        </div>
    );
};

export default OverviewChart;

