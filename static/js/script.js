function validarCPF() {
    const cpf = limpaFormatacao(document.getElementById('cpf').value);

    if (cpf.length !== 11) {
        mostraResultado('CPF deve conter 11 dígitos.', 'red');
        return;
    }

    if (verificaDigitosRepetidos(cpf)) {
        mostraResultado('CPF não pode conter repetição do mesmo dígito.', 'red');
        return;
    }

    const digito1 = calcularDigitoVerificador(cpf, 1);
    const digito2 = calcularDigitoVerificador(cpf, 2);

    if (digito1 !== cpf.charAt(9) || digito2 !== cpf.charAt(10)) {
        mostraResultado(`CPF inválido - ${cpf}`, 'red');
        return;
    }

    mostraResultado('CPF válido.', 'green');
}

function calcularDigitoVerificador(cpf, posicao) {
    const sequencia = cpf.slice(0, 9 + posicao).split('');

    let soma = sequencia.reduce((acc, numero, index) => {
        const multiplicador = 10 + posicao - index;
        return acc + multiplicador * Number(numero);
    }, 0);

    const restoDivisao = (soma * 10) % 11;
    const digito = restoDivisao === 10 ? 0 : restoDivisao;

    return digito.toString();
}

function limpaFormatacao(cpf) {
    return cpf.replace(/\D/g, '');
}

function mostraResultado(texto, cor) {
    const span = document.getElementById('resultado');
    span.innerHTML = texto;
    span.style.color = cor;
}

function verificaDigitosRepetidos(cpf) {
    return cpf.split('').every((d) => d === cpf[0]);
}
