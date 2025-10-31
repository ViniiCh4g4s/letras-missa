<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Tema;

class MusicaSeeder extends Seeder
{
    public function run(): void
    {
        /**
         * Run the database seeds.
         */
        $entradaId = Tema::where('slug', 'entrada')->first()?->id;
        $perdaoId = Tema::where('slug', 'ato-penitencial')->first()?->id;
        $gloriaId = Tema::where('slug', 'gloria')->first()?->id;
        $meditacaoId = Tema::where('slug', 'meditacao')->first()?->id;
        $aclamacaoId = Tema::where('slug', 'aclamacao')->first()?->id;
        $ofertorioId = Tema::where('slug', 'ofertorio')->first()?->id;
        $santoId = Tema::where('slug', 'santo')->first()?->id;
        $comunhaoId = Tema::where('slug', 'comunhao')->first()?->id;
        $acaoGracasId = Tema::where('slug', 'acao-de-gracas')->first()?->id;
        $finalId = Tema::where('slug', 'final')->first()?->id;

        $musicas = [
            [
                'numero' => 652,
                'titulo' => 'Cantai a Deus com Alegria',
                'letra' => "**Cantai a Deus com alegria.**\n**Exultai em seu santuário.**\n\nPovos todos, aplaudi ao Deus que nos criou.\nRejubilai em sua presença\ncantando louvores ao Senhor!\n\n*Dançai... Pulai...*",
                'autor' => 'Timbó/Carmadélio',
                'tom' => 'D',
                'tema_id' => $entradaId,
                'ativo' => true,
            ],
            [
                'numero' => 637,
                'titulo' => 'Perdão, Senhor',
                'letra' => "Perdão, Senhor, tantos erros cometi\nPerdão, Senhor, tantas vezes me omiti\n\n*Perdão, Senhor pelos males que causei*\n*Pelas coisas que falei, pelo irmão que eu julguei (bis)*\n\n**Piedade, Senhor, tem piedade, senhor**\n**Meu pecado vem lavar com seu amor**\n**Piedade, Senhor, tem piedade, senhor**\n**E liberta minha alma para o amor**",
                'autor' => 'Luiz Carlos Agostini',
                'tom' => 'C',
                'tema_id' => $perdaoId,
                'ativo' => true,
            ],
            [
                'numero' => 1,
                'titulo' => 'Glória a Deus Nas Alturas',
                'letra' => "Glória a Deus nas alturas\nE paz na terra aos homens por Ele amados\nSenhor Deus, Rei dos céus, Deus Pai todo-poderoso\n\n**Nós vos louvamos**\n**Nós vos bendizemos**\n**Nós vos adoramos**\n**Nós vos glorificamos**\n**Nós vos damos graças por vossa imensa glória**\n\nSenhor Jesus Cristo, Filho Unigênito\nSenhor Deus, Cordeiro de Deus, Filho de Deus Pai\n*Vós que tirais o pecado do mundo, tende piedade de nós*\n*Vós que tirais o pecado do mundo, acolhei a nossa súplica*\n*Vós que estais à direita do Pai, tende piedade de nós*\n\n**Só vós sois Santo**\n**Só vós o Senhor**\n**Só vós o Altíssimo, Jesus Cristo**\n**Com o Espírito Santo**\n\n**Na glória de Deus Pai, amém! (4x)**",
                'autor' => 'Eliana Ribeiro',
                'tom' => 'D',
                'tema_id' => $gloriaId,
                'ativo' => true,
            ],
            [
                'numero' => 2,
                'titulo' => 'Tua Palavra',
                'letra' => "Tua palavra é\nLuz para o meu caminho\nTua palavra\nLâmpada para os meus pés (bis)\n\nE Teu amor\nÉ como a doce água\nQue vem a mim\nComo em meio a um deserto\n\nComo um orvalho\nQue desce em plena terra seca\nE dela faz surgir verdes pastos\nComo um orvalho\nQue desce em plena terra seca\nE dela faz surgir, ó, verdes pastos\n\n**Quero fazer valer Tua palavra em mim**\n**Pra que o doente tenha onde se curar**\n**Quero fazer valer Tua palavra em mim**\n**Pra que o mundo saiba que Tu és Senhor**\n\n**Tu és Senhor**\n**Tu és Senhor, Jesus**\n\nPois em meio\nEm meio à Tua palavra\nSe fizeram os céus\nE o brilho do Sol se fez reinar em meio às trevas\n\n[Refrão]\n\nTua palavra\nÉ luz, é luz, é luz\nTu és Senhor\nSenhor\nTu és Jesus",
                'autor' => 'Aline Barros',
                'tom' => 'E',
                'tema_id' => $meditacaoId,
                'ativo' => true,
            ],
            [
                'numero' => 3,
                'titulo' => 'Como São Belos',
                'letra' => "Como são belos os pés do mensageiro\nQue anuncia a paz\nComo são belos os pés do mensageiro\nQue anuncia o Senhor\n\n**Ele vive, Ele reina**\n**Ele é Deus e Senhor**\n**Ele vive, Ele reina**\n**Ele é Deus e Senhor**\n\nO meu Senhor chegou com toda a glória\nE vivo, eu sei, Ele está\nBem junto a nós, Seu corpo santo a nos tocar\nE vivo, eu sei, Ele está\n\n**Porque Ele vive, Ele reina**\n**Ele é Deus e Senhor**\n**Porque Ele vive, Ele reina**\n**Ele é Deus e Senhor**",
                'autor' => 'Músicas Católicas',
                'tom' => 'C',
                'tema_id' => $aclamacaoId,
                'ativo' => true,
            ],
            [
                'numero' => 484,
                'titulo' => 'Venho a Ti',
                'letra' => "Venho a Ti\nE sei que não estou mais sozinho\nMuitas vozes se elevam para o céu\nVenho a Ti\nCom aqueles irmãos verdadeiros\nQue comigo dão a Ti seus corações\n\n**E Tu, que és o amor**\n**Escuta cada prece de dor, de amor**\n**E tu, que és a paz**\n**Dá-nos a esperança em cada momento, Senhor**\n**E abre o paraíso a nós**\n**E abre o paraíso a nós**",
                'autor' => 'Gen Rosso',
                'tom' => 'E',
                'tema_id' => $ofertorioId,
                'ativo' => true,
            ],
            [
                'numero' => 4,
                'titulo' => 'Santo',
                'letra' => "**Santo, Santo, Santo é o Senhor**\n**Senhor Deus do Universo**\n**O céu e a terra proclamam a Vossa glória**\n\n**Santo, Santo, Santo é o Senhor, Senhor Deus do Universo**\n**O céu e a terra proclamam a Vossa glória**\n**Hosana no alto céu**\n\nBendito é aquele que vem em nome do Senhor\n\nHosana, Hosana no alto céu\nHosana, Hosana no alto céu\n\n**Santo, Santo, Santo é o Senhor**\n**Senhor Deus do Universo**\n**O céu e a terra proclamam a Vossa glória**\n**Hosana no alto céu**",
                'autor' => 'Capella',
                'tom' => 'F',
                'tema_id' => $santoId,
                'ativo' => true,
            ],
            [
                'numero' => 663,
                'titulo' => 'Juras de Amor',
                'letra' => "Quero transformar numa canção\nAs juras de amor por Ti, meu Deus\nEntraste em minha vida sedutor\nJá não sei viver sem Teu amor\n\n**Tudo Te entreguei, nada me restou**\n**Livre eu fiquei para Te amar, meu Deus**\n**Tudo me pediste, nada eu Te neguei**\n**Hoje eu sou feliz assim**\n**Tenho a Ti, meu Deus**",
                'autor' => 'Monsenhor Jonas Abib',
                'tom' => 'C',
                'tema_id' => $comunhaoId,
                'ativo' => true,
            ],
            [
                'numero' => 5,
                'titulo' => 'Obrigado',
                'letra' => "Eu Te agradeço, Senhor\nPelo carinho, pelo amor\nPelo cuidado que tens por mim\n\nToma minha vida em Tuas mãos\nMeu coração vem transformar\nEm Cristo um novo ser, cada vez mais\n\n*Quanta esperança*\n*Santa harmonia*\n*Ouço uma voz me chamar*\n*Voz de perdão*\n\n**Brilho celeste, então**\n**Toca minha face com ternura e diz:**\n**Meu filho, descanso e paz em Mim vais achar**\n\nCristo Te amo\nTu és minha luz\nEu te agradeço\nQuerido Jesus",
                'autor' => 'Leonardo Gonçalves',
                'tom' => 'G',
                'tema_id' => $acaoGracasId,
                'ativo' => true,
            ],
            [
                'numero' => 101,
                'titulo' => 'Segura na Mão de Deus',
                'letra' => "Se as águas do mar da vida quiserem te afogar\n*Segura na mão de Deus e vai*\nSe as tristezas desta vida quiserem te sufocar\n*Segura na mão de Deus e vai*\n\n**Segura na mão de Deus, segura na mão de Deus**\n**Pois ela, ela te sustentará**\n**Não temas, segue adiante e não olhes para trás**\n**Segura na mão de Deus e vai**\n\nSe a jornada é pesada e te cansas da caminhada\n*Segura na mão de Deus e vai*\nOrando, jejuando, confiando e confessando\n*Segura na mão de Deus e vai*\n\n[Refrão]\n\nO Espírito do Senhor sempre te revestirá\n*Segura na mão de Deus e vai*\nJesus Cristo prometeu que jamais te deixará\n*Segura na mão de Deus e vai*\n\n[Refrão]",
                'autor' => 'Músicas Católicas',
                'tom' => 'E',
                'tema_id' => $finalId,
                'ativo' => true,
            ],
        ];

        foreach ($musicas as $musica) {
            DB::table('musicas')->insert([
                'numero' => $musica['numero'],
                'titulo' => $musica['titulo'],
                'letra' => $musica['letra'],
                'autor' => $musica['autor'],
                'tom' => $musica['tom'],
                'tema_id' => $musica['tema_id'],
                'ativo' => $musica['ativo'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
