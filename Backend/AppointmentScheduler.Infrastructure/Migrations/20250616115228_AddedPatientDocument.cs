using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppointmentScheduler.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedPatientDocument : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsVariableDuration",
                table: "Service");

            migrationBuilder.CreateTable(
                name: "Disease",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Disease", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PatientDocument",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExpireAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsPatientUnhealthy = table.Column<bool>(type: "bit", nullable: false),
                    PatientIllness = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: true),
                    IsTreatedByDoctor = table.Column<bool>(type: "bit", nullable: false),
                    TreatedIllness = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: true),
                    HasBeenInHospital = table.Column<bool>(type: "bit", nullable: false),
                    MedicationsTaking = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: true),
                    AllergicToMedicationOrSomething = table.Column<bool>(type: "bit", nullable: false),
                    TreatedUnderLocalAnesthesia = table.Column<bool>(type: "bit", nullable: false),
                    HasBleedingDisorder = table.Column<bool>(type: "bit", nullable: false),
                    HasRadiationTherapy = table.Column<bool>(type: "bit", nullable: false),
                    HasInfectiousDisease = table.Column<bool>(type: "bit", nullable: false),
                    HadBloodTransfusion = table.Column<bool>(type: "bit", nullable: false),
                    TypeOfTransfusion = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: true),
                    DateOfTransfusion = table.Column<DateTime>(type: "datetime2", nullable: true),
                    HasAids = table.Column<bool>(type: "bit", nullable: false),
                    IsHivPositive = table.Column<bool>(type: "bit", nullable: false),
                    IsPregnant = table.Column<bool>(type: "bit", nullable: false),
                    DeliveryDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    WantSixMonthTherapyMessage = table.Column<bool>(type: "bit", nullable: false),
                    IsAgreedToTreatment = table.Column<bool>(type: "bit", nullable: false),
                    PatientId = table.Column<long>(type: "bigint", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientDocument", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatientDocument_User_PatientId",
                        column: x => x.PatientId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PatientDocumentDisease",
                columns: table => new
                {
                    PatientDocumentId = table.Column<long>(type: "bigint", nullable: false),
                    DiseaseId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientDocumentDisease", x => new { x.PatientDocumentId, x.DiseaseId });
                    table.ForeignKey(
                        name: "FK_PatientDocumentDisease_Disease_DiseaseId",
                        column: x => x.DiseaseId,
                        principalTable: "Disease",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PatientDocumentDisease_PatientDocument_PatientDocumentId",
                        column: x => x.PatientDocumentId,
                        principalTable: "PatientDocument",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PatientDocument_PatientId",
                table: "PatientDocument",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_PatientDocumentDisease_DiseaseId",
                table: "PatientDocumentDisease",
                column: "DiseaseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PatientDocumentDisease");

            migrationBuilder.DropTable(
                name: "Disease");

            migrationBuilder.DropTable(
                name: "PatientDocument");

            migrationBuilder.AddColumn<bool>(
                name: "IsVariableDuration",
                table: "Service",
                type: "bit",
                nullable: true);
        }
    }
}
