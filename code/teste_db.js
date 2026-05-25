const { User, Property, PlantingArea, Crop, PlantingRecord, Recommendation } = require("./src/models");

async function testarRelacionamentos() {
  try {
    console.log("🚀 Iniciando teste de integração...");

    // 1. Criar Usuário
    const user = await User.create({
      name: "Agrônomo de Teste",
      email: `teste_${Date.now()}@btg.com`,
      password_hash: "123456",
      role: "agronomo"
    });
    console.log("✅ Usuário criado!");

    // 2. Criar Propriedade vinculada ao Usuário
    const property = await Property.create({
      user_id: user.id,
      name: "Fazenda Modelo",
      city: "Belo Horizonte",
      state: "MG"
    });
    console.log("✅ Propriedade vinculada ao usuário!");

    // 3. Criar Área de Plantio vinculada à Propriedade
    const area = await PlantingArea.create({
      property_id: property.id,
      name: "Talhão Norte",
      size_hectares: 50.5
    });
    console.log("✅ Área de plantio vinculada à propriedade!");

    // 4. Criar Cultura
    const crop = await Crop.create({
      name: "Soja",
      scientific_name: "Glycine max"
    });
    console.log("✅ Cultura criada!");

    // 5. Criar Registro de Plantio (O teste final de relacionamento)
    const record = await PlantingRecord.create({
      planting_area_id: area.id,
      crop_id: crop.id,
      plant_date: new Date(),
      status: "Em Andamento"
    });
    console.log("✅ Registro de plantio cruzando Área e Cultura!");

    // 6. Criar Recomendação vinculada ao Autor e Cultura
    await Recommendation.create({
      crop_id: crop.id,
      author_id: user.id,
      target_season: "Verão",
      climate_condition: "Chuvoso",
      description: "Manter monitoramento de pragas devido à umidade."
    });
    console.log("✅ Recomendação técnica criada!");

    console.log("\n🏆 SUCESSO TOTAL! Todos os relacionamentos estão íntegros.");
    process.exit(0);

  } catch (error) {
    console.error("\n❌ ERRO NO TESTE:", error.message);
    console.log("Verifique se as migrations foram rodadas e se os nomes de campos no Model batem com o Banco.");
    process.exit(1);
  }
}

testarRelacionamentos();