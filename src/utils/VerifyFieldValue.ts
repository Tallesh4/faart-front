export class VerifyFieldValue {
		verify(method: any, field: any, value: any, itens: any) {

				// Verificando se existe algum campo em branco, pra habilitar ou desabilitar os botoes
				itens[field] = { ...itens[field], value: value }
				// numero de erros
				let countValidate = 0;
				let validate = false;

				const keys = Object.keys(itens)

				for (let index = 0; index < keys.length; index++) {

					const key = keys[index]

					// Verificando se existe algum valor
					if (itens[key].value) {

						itens[key].validator = true
					}

					if (!itens[key].value) {

						itens[key].validator = false
					}

					// Na ultima parte do loop verifica se existe algumo validator falso
					if (index === keys.length - 1) {

						for (let index in keys) {

							const key = keys[index]

							switch (method) {
								case "create":
									if (!itens[key].validator) {
										countValidate++;
									}
									break;

								case "update":
									if (!itens['name'].value.length) {
										countValidate++;
									}
									break;
							}

						}
					}
				}

				// Botao por padrao começa desabilitado, aqui só fazendo a troca pra true ou false;
				if (countValidate >= 1) {

					return validate = true;
				}

				if (countValidate <= 0) {

					return validate = false
				}
		}
}
