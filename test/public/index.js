// https://github.com/Rich-Harris/namey-mcnameface

const animals = [
    'aardvark',
    'aardwolf',
    'albatross',
    'alligator',
    'alpaca',
    'amphibian',
    'anaconda',
    'angelfish',
    'anglerfish',
    'ant',
    'anteater',
    'antelope',
    'antlion',
    'ape',
    'aphid',
    'armadillo',
    'asp',
    'baboon',
    'badger',
    'bandicoot',
    'barnacle',
    'barracuda',
    'basilisk',
    'bass',
    'bat',
    'bear',
    'beaver',
    'bedbug',
    'bee',
    'beetle',
    'bird',
    'bison',
    'blackbird',
    'boa',
    'boar',
    'bobcat',
    'bobolink',
    'bonobo',
    'booby',
    'bovid',
    'bug',
    'butterfly',
    'buzzard',
    'camel',
    'canid',
    'capybara',
    'cardinal',
    'caribou',
    'carp',
    'cat',
    'catshark',
    'caterpillar',
    'catfish',
    'cattle',
    'centipede',
    'cephalopod',
    'chameleon',
    'cheetah',
    'chickadee',
    'chicken',
    'chimpanzee',
    'chinchilla',
    'chipmunk',
    'clam',
    'clownfish',
    'cobra',
    'cockroach',
    'cod',
    'condor',
    'constrictor',
    'coral',
    'cougar',
    'cow',
    'coyote',
    'crab',
    'crane',
    'crawdad',
    'crayfish',
    'cricket',
    'crocodile',
    'crow',
    'cuckoo',
    'cicada',
    'damselfly',
    'deer',
    'dingo',
    'dinosaur',
    'dog',
    'dolphin',
    'donkey',
    'dormouse',
    'dove',
    'dragonfly',
    'dragon',
    'duck',
    'eagle',
    'earthworm',
    'earwig',
    'echidna',
    'eel',
    'egret',
    'elephant',
    'elk',
    'emu',
    'ermine',
    'falcon',
    'ferret',
    'finch',
    'firefly',
    'fish',
    'flamingo',
    'flea',
    'fly',
    'flyingfish',
    'fowl',
    'fox',
    'frog',
    'gamefowl',
    'galliform',
    'gazelle',
    'gecko',
    'gerbil',
    'gibbon',
    'giraffe',
    'goat',
    'goldfish',
    'goose',
    'gopher',
    'gorilla',
    'grasshopper',
    'grouse',
    'guan',
    'guanaco',
    'guineafowl',
    'gull',
    'guppy',
    'haddock',
    'halibut',
    'hamster',
    'hare',
    'harrier',
    'hawk',
    'hedgehog',
    'heron',
    'herring',
    'hippopotamus',
    'hookworm',
    'hornet',
    'horse',
    'hoverfly',
    'hummingbird',
    'hyena',
    'iguana',
    'impala',
    'jackal',
    'jaguar',
    'jay',
    'jellyfish',
    'junglefowl',
    'kangaroo',
    'kingfisher',
    'kite',
    'kiwi',
    'koala',
    'koi',
    'krill',
    'ladybug',
    'lamprey',
    'landfowl',
    'lark',
    'leech',
    'lemming',
    'lemur',
    'leopard',
    'leopon',
    'limpet',
    'lion',
    'lizard',
    'llama',
    'lobster',
    'locust',
    'loon',
    'louse',
    'lungfish',
    'lynx',
    'macaw',
    'mackerel',
    'magpie',
    'mammal',
    'manatee',
    'mandrill',
    'marlin',
    'marmoset',
    'marmot',
    'marsupial',
    'marten',
    'mastodon',
    'meadowlark',
    'meerkat',
    'mink',
    'minnow',
    'mite',
    'mockingbird',
    'mole',
    'mollusk',
    'mongoose',
    'monkey',
    'moose',
    'mosquito',
    'moth',
    'mouse',
    'mule',
    'muskox',
    'narwhal',
    'newt',
    'nightingale',
    'ocelot',
    'octopus',
    'opossum',
    'orangutan',
    'orca',
    'ostrich',
    'otter',
    'owl',
    'ox',
    'panda',
    'panther',
    'parakeet',
    'parrot',
    'parrotfish',
    'partridge',
    'peacock',
    'peafowl',
    'pelican',
    'penguin',
    'perch',
    'pheasant',
    'pig',
    'pigeon',
    'pike',
    'pinniped',
    'piranha',
    'planarian',
    'platypus',
    'pony',
    'porcupine',
    'porpoise',
    'possum',
    'prawn',
    'primate',
    'ptarmigan',
    'puffin',
    'puma',
    'python',
    'quail',
    'quelea',
    'quokka',
    'rabbit',
    'raccoon',
    'rat',
    'rattlesnake',
    'raven',
    'reindeer',
    'reptile',
    'rhinoceros',
    'roadrunner',
    'rodent',
    'rook',
    'rooster',
    'roundworm',
    'sailfish',
    'salamander',
    'salmon',
    'sawfish',
    'scallop',
    'scorpion',
    'seahorse',
    'shark',
    'sheep',
    'shrew',
    'shrimp',
    'silkworm',
    'silverfish',
    'skink',
    'skunk',
    'sloth',
    'slug',
    'smelt',
    'snail',
    'snake',
    'snipe',
    'sole',
    'sparrow',
    'spider',
    'spoonbill',
    'squid',
    'squirrel',
    'starfish',
    'stingray',
    'stoat',
    'stork',
    'sturgeon',
    'swallow',
    'swan',
    'swift',
    'swordfish',
    'swordtail',
    'tahr',
    'takin',
    'tapir',
    'tarantula',
    'tarsier',
    'termite',
    'tern',
    'thrush',
    'tick',
    'tiger',
    'tiglon',
    'toad',
    'tortoise',
    'toucan',
    'trout',
    'tuna',
    'turkey',
    'turtle',
    'urial',
    'vicuna',
    'viper',
    'vole',
    'vulture',
    'wallaby',
    'walrus',
    'wasp',
    'warbler',
    'weasel',
    'whale',
    'whippet',
    'whitefish',
    'wildcat',
    'wildebeest',
    'wildfowl',
    'wolf',
    'wolverine',
    'wombat',
    'woodpecker',
    'worm',
    'wren',
    'xerinae',
    'yak',
    'zebra',
    'alpaca',
    'cat',
    'cattle',
    'chicken',
    'dog',
    'donkey',
    'ferret',
    'gayal',
    'goldfish',
    'guppy',
    'horse',
    'koi',
    'llama',
    'sheep',
    'yak',
];
var adjectives = [
    'aback',
    'abaft',
    'abandoned',
    'abashed',
    'aberrant',
    'abhorrent',
    'abiding',
    'abject',
    'ablaze',
    'able',
    'abnormal',
    'aboard',
    'aboriginal',
    'abortive',
    'abounding',
    'abrasive',
    'abrupt',
    'absent',
    'absolute',
    'absorbed',
    'absorbing',
    'abstracted',
    'absurd',
    'abundant',
    'abusive',
    'academic',
    'acceptable',
    'accessible',
    'accidental',
    'acclaimed',
    'accomplished',
    'accurate',
    'aching',
    'acid',
    'acidic',
    'acoustic',
    'acrid',
    'acrobatic',
    'active',
    'actual',
    'actually',
    'ad hoc',
    'adamant',
    'adaptable',
    'addicted',
    'adept',
    'adhesive',
    'adjoining',
    'admirable',
    'admired',
    'adolescent',
    'adorable',
    'adored',
    'advanced',
    'adventurous',
    'affectionate',
    'afraid',
    'aged',
    'aggravating',
    'aggressive',
    'agile',
    'agitated',
    'agonizing',
    'agreeable',
    'ahead',
    'ajar',
    'alarmed',
    'alarming',
    'alcoholic',
    'alert',
    'alienated',
    'alike',
    'alive',
    'all',
    'alleged',
    'alluring',
    'aloof',
    'altruistic',
    'amazing',
    'ambiguous',
    'ambitious',
    'amiable',
    'ample',
    'amuck',
    'amused',
    'amusing',
    'anchored',
    'ancient',
    'ancient',
    'angelic',
    'angry',
    'angry',
    'anguished',
    'animated',
    'annoyed',
    'annoying',
    'annual',
    'another',
    'antique',
    'antsy',
    'anxious',
    'any',
    'apathetic',
    'appetizing',
    'apprehensive',
    'appropriate',
    'apt',
    'aquatic',
    'arctic',
    'arid',
    'aromatic',
    'arrogant',
    'artistic',
    'ashamed',
    'aspiring',
    'assorted',
    'assured',
    'astonishing',
    'athletic',
    'attached',
    'attentive',
    'attractive',
    'auspicious',
    'austere',
    'authentic',
    'authorized',
    'automatic',
    'available',
    'avaricious',
    'average',
    'awake',
    'aware',
    'awesome',
    'awful',
    'awkward',
    'axiomatic',
    'babyish',
    'back',
    'bad',
    'baggy',
    'barbarous',
    'bare',
    'barren',
    'bashful',
    'basic',
    'batty',
    'bawdy',
    'beautiful',
    'beefy',
    'befitting',
    'belated',
    'belligerent',
    'beloved',
    'beneficial',
    'bent',
    'berserk',
    'best',
    'better',
    'bewildered',
    'bewitched',
    'big',
    'big-hearted',
    'billowy',
    'biodegradable',
    'bite-sized',
    'biting',
    'bitter',
    'bizarre',
    'black',
    'black-and-white',
    'bland',
    'blank',
    'blaring',
    'bleak',
    'blind',
    'blissful',
    'blond',
    'bloody',
    'blue',
    'blue-eyed',
    'blushing',
    'bogus',
    'boiling',
    'bold',
    'bony',
    'boorish',
    'bored',
    'boring',
    'bossy',
    'both',
    'bouncy',
    'boundless',
    'bountiful',
    'bowed',
    'brainy',
    'brash',
    'brave',
    'brawny',
    'breakable',
    'breezy',
    'brief',
    'bright',
    'brilliant',
    'brisk',
    'broad',
    'broken',
    'bronze',
    'brown',
    'bruised',
    'bubbly',
    'bulky',
    'bumpy',
    'buoyant',
    'burdensome',
    'burly',
    'bustling',
    'busy',
    'buttery',
    'buzzing',
    'cagey',
    'calculating',
    'callous',
    'calm',
    'candid',
    'canine',
    'capable',
    'capital',
    'capricious',
    'carefree',
    'careful',
    'careless',
    'caring',
    'cautious',
    'cavernous',
    'ceaseless',
    'celebrated',
    'certain',
    'changeable',
    'charming',
    'cheap',
    'cheeky',
    'cheerful',
    'cheery',
    'chemical',
    'chief',
    'childlike',
    'chilly',
    'chivalrous',
    'chubby',
    'chunky',
    'circular',
    'clammy',
    'classic',
    'classy',
    'clean',
    'clear',
    'clear-cut',
    'clever',
    'cloistered',
    'close',
    'closed',
    'cloudy',
    'clueless',
    'clumsy',
    'cluttered',
    'coarse',
    'coherent',
    'cold',
    'colorful',
    'colorless',
    'colossal',
    'colossal',
    'combative',
    'comfortable',
    'common',
    'compassionate',
    'competent',
    'complete',
    'complex',
    'complicated',
    'composed',
    'concerned',
    'concrete',
    'condemned',
    'condescending',
    'confused',
    'conscious',
    'considerate',
    'constant',
    'contemplative',
    'content',
    'conventional',
    'convincing',
    'convoluted',
    'cooing',
    'cooked',
    'cool',
    'cooperative',
    'coordinated',
    'corny',
    'corrupt',
    'costly',
    'courageous',
    'courteous',
    'cowardly',
    'crabby',
    'crafty',
    'craven',
    'crazy',
    'creamy',
    'creative',
    'creepy',
    'criminal',
    'crisp',
    'critical',
    'crooked',
    'crowded',
    'cruel',
    'crushing',
    'cuddly',
    'cultivated',
    'cultured',
    'cumbersome',
    'curious',
    'curly',
    'curved',
    'curvy',
    'cut',
    'cute',
    'cylindrical',
    'cynical',
    'daffy',
    'daily',
    'damaged',
    'damaging',
    'damp',
    'dangerous',
    'dapper',
    'dapper',
    'daring',
    'dark',
    'darling',
    'dashing',
    'dazzling',
    'dead',
    'deadly',
    'deadpan',
    'deafening',
    'dear',
    'dearest',
    'debonair',
    'decayed',
    'deceitful',
    'decent',
    'decimal',
    'decisive',
    'decorous',
    'deep',
    'deeply',
    'defeated',
    'defective',
    'defenseless',
    'defensive',
    'defiant',
    'deficient',
    'definite',
    'delayed',
    'delectable',
    'delicate',
    'delicious',
    'delightful',
    'delirious',
    'demanding',
    'demonic',
    'dense',
    'dental',
    'dependable',
    'dependent',
    'depraved',
    'depressed',
    'deranged',
    'descriptive',
    'deserted',
    'despicable',
    'detailed',
    'determined',
    'devilish',
    'devoted',
    'didactic',
    'different',
    'difficult',
    'digital',
    'dilapidated',
    'diligent',
    'dim',
    'diminutive',
    'dimpled',
    'dimwitted',
    'direct',
    'direful',
    'dirty',
    'disagreeable',
    'disastrous',
    'discreet',
    'discrete',
    'disfigured',
    'disguised',
    'disgusted',
    'disgusting',
    'dishonest',
    'disillusioned',
    'disloyal',
    'dismal',
    'dispensable',
    'distant',
    'distinct',
    'distorted',
    'distraught',
    'distressed',
    'disturbed',
    'divergent',
    'dizzy',
    'domineering',
    'dopey',
    'doting',
    'double',
    'doubtful',
    'downright',
    'drab',
    'draconian',
    'drafty',
    'drained',
    'dramatic',
    'dreary',
    'droopy',
    'drunk',
    'dry',
    'dual',
    'dull',
    'dull',
    'dusty',
    'dutiful',
    'dynamic',
    'dysfunctional',
    'each',
    'eager',
    'early',
    'earnest',
    'earsplitting',
    'earthy',
    'easy',
    'easy-going',
    'eatable',
    'economic',
    'ecstatic',
    'edible',
    'educated',
    'efficacious',
    'efficient',
    'eight',
    'elaborate',
    'elastic',
    'elated',
    'elderly',
    'electric',
    'elegant',
    'elementary',
    'elfin',
    'elite',
    'elliptical',
    'emaciated',
    'embarrassed',
    'embellished',
    'eminent',
    'emotional',
    'empty',
    'enchanted',
    'enchanting',
    'encouraging',
    'endurable',
    'energetic',
    'enlightened',
    'enormous',
    'enraged',
    'entertaining',
    'enthusiastic',
    'entire',
    'envious',
    'envious',
    'equable',
    'equal',
    'equatorial',
    'erect',
    'erratic',
    'essential',
    'esteemed',
    'ethereal',
    'ethical',
    'euphoric',
    'evanescent',
    'evasive',
    'even',
    'evergreen',
    'everlasting',
    'every',
    'evil',
    'exalted',
    'exasperated',
    'excellent',
    'excitable',
    'excited',
    'exciting',
    'exclusive',
    'exemplary',
    'exhausted',
    'exhilarated',
    'exotic',
    'expensive',
    'experienced',
    'expert',
    'extensive',
    'extra-large',
    'extraneous',
    'extra-small',
    'extroverted',
    'exuberant',
    'exultant',
    'fabulous',
    'faded',
    'failing',
    'faint',
    'fair',
    'faithful',
    'fake',
    'fallacious',
    'false',
    'familiar',
    'famous',
    'fanatical',
    'fancy',
    'fantastic',
    'far',
    'faraway',
    'far-flung',
    'far-off',
    'fascinated',
    'fast',
    'fat',
    'fatal',
    'fatherly',
    'faulty',
    'favorable',
    'favorite',
    'fearful',
    'fearless',
    'feeble',
    'feigned',
    'feisty',
    'feline',
    'female',
    'feminine',
    'fertile',
    'festive',
    'few',
    'fickle',
    'fierce',
    'filthy',
    'fine',
    'finicky',
    'finished',
    'firm',
    'first',
    'firsthand',
    'fitting',
    'five',
    'fixed',
    'flagrant',
    'flaky',
    'flamboyant',
    'flashy',
    'flat',
    'flawed',
    'flawless',
    'flickering',
    'flimsy',
    'flippant',
    'floppy',
    'flowery',
    'flufy',
    'fluid',
    'flustered',
    'fluttering',
    'foamy',
    'focused',
    'fond',
    'foolhardy',
    'foolish',
    'forceful',
    'foregoing',
    'forgetful',
    'forked',
    'formal',
    'forsaken',
    'forthright',
    'fortunate',
    'four',
    'fragile',
    'fragrant',
    'frail',
    'frank',
    'frantic',
    'frayed',
    'free',
    'freezing',
    'french',
    'frequent',
    'fresh',
    'fretful',
    'friendly',
    'frightened',
    'frightening',
    'frigid',
    'frilly',
    'frivolous',
    'frizzy',
    'front',
    'frosty',
    'frothy',
    'frozen',
    'frugal',
    'fruitful',
    'frustrating',
    'full',
    'fumbling',
    'fumbling',
    'functional',
    'funny',
    'furry',
    'furtive',
    'fussy',
    'future',
    'futuristic',
    'fuzzy',
    'gabby',
    'gainful',
    'gamy',
    'gaping',
    'gargantuan',
    'garrulous',
    'gaseous',
    'gaudy',
    'general',
    'general',
    'generous',
    'gentle',
    'genuine',
    'ghastly',
    'giant',
    'giddy',
    'gifted',
    'gigantic',
    'giving',
    'glamorous',
    'glaring',
    'glass',
    'gleaming',
    'gleeful',
    'glib',
    'glistening',
    'glittering',
    'gloomy',
    'glorious',
    'glossy',
    'glum',
    'godly',
    'golden',
    'good',
    'good-natured',
    'goofy',
    'gorgeous',
    'graceful',
    'gracious',
    'grand',
    'grandiose',
    'grandiose',
    'granular',
    'grateful',
    'gratis',
    'grave',
    'gray',
    'greasy',
    'great',
    'greedy',
    'green',
    'gregarious',
    'grey',
    'grieving',
    'grim',
    'grimy',
    'gripping',
    'grizzled',
    'groovy',
    'gross',
    'grotesque',
    'grouchy',
    'grounded',
    'growing',
    'growling',
    'grown',
    'grubby',
    'gruesome',
    'grumpy',
    'guarded',
    'guiltless',
    'guilty',
    'gullible',
    'gummy',
    'gusty',
    'guttural',
    'habitual',
    'hairy',
    'half',
    'half',
    'hallowed',
    'halting',
    'handmade',
    'handsome',
    'handsomely',
    'handy',
    'hanging',
    'hapless',
    'happy',
    'happy-go-lucky',
    'hard',
    'hard-to-find',
    'harebrained',
    'harmful',
    'harmless',
    'harmonious',
    'harsh',
    'hasty',
    'hateful',
    'haunting',
    'heady',
    'healthy',
    'heartbreaking',
    'heartfelt',
    'hearty',
    'heavenly',
    'heavy',
    'hefty',
    'hellish',
    'helpful',
    'helpless',
    'hesitant',
    'hidden',
    'hideous',
    'high',
    'highfalutin',
    'high-level',
    'high-pitched',
    'hilarious',
    'hissing',
    'historical',
    'hoarse',
    'holistic',
    'hollow',
    'homeless',
    'homely',
    'honest',
    'honorable',
    'honored',
    'hopeful',
    'horrible',
    'horrific',
    'hospitable',
    'hot',
    'huge',
    'hulking',
    'humble',
    'humdrum',
    'humiliating',
    'humming',
    'humongous',
    'humorous',
    'hungry',
    'hurried',
    'hurt',
    'hurtful',
    'hushed',
    'husky',
    'hypnotic',
    'hysterical',
    'icky',
    'icy',
    'ideal',
    'ideal',
    'idealistic',
    'identical',
    'idiotic',
    'idle',
    'idolized',
    'ignorant',
    'ill',
    'illegal',
    'ill-fated',
    'ill-informed',
    'illiterate',
    'illustrious',
    'imaginary',
    'imaginative',
    'immaculate',
    'immaterial',
    'immediate',
    'immense',
    'imminent',
    'impartial',
    'impassioned',
    'impeccable',
    'imperfect',
    'imperturbable',
    'impish',
    'impolite',
    'important',
    'imported',
    'impossible',
    'impractical',
    'impressionable',
    'impressive',
    'improbable',
    'impure',
    'inborn',
    'incandescent',
    'incomparable',
    'incompatible',
    'incompetent',
    'incomplete',
    'inconclusive',
    'inconsequential',
    'incredible',
    'indelible',
    'indolent',
    'industrious',
    'inexpensive',
    'inexperienced',
    'infamous',
    'infantile',
    'infatuated',
    'inferior',
    'infinite',
    'informal',
    'innate',
    'innocent',
    'inquisitive',
    'insecure',
    'insidious',
    'insignificant',
    'insistent',
    'instinctive',
    'instructive',
    'insubstantial',
    'intelligent',
    'intent',
    'intentional',
    'interesting',
    'internal',
    'international',
    'intrepid',
    'intrigued',
    'invincible',
    'irate',
    'ironclad',
    'irresponsible',
    'irritable',
    'irritating',
    'itchy',
    'jaded',
    'jagged',
    'jam-packed',
    'jaunty',
    'jazzy',
    'jealous',
    'jittery',
    'jobless',
    'joint',
    'jolly',
    'jovial',
    'joyful',
    'joyous',
    'jubilant',
    'judicious',
    'juicy',
    'jumbled',
    'jumbo',
    'jumpy',
    'jumpy',
    'junior',
    'juvenile',
    'kaleidoscopic',
    'kaput',
    'keen',
    'key',
    'kind',
    'kindhearted',
    'kindly',
    'klutzy',
    'knobby',
    'knotty',
    'knowing',
    'knowledgeable',
    'known',
    'kooky',
    'kosher',
    'labored',
    'lackadaisical',
    'lacking',
    'lame',
    'lame',
    'lamentable',
    'languid',
    'lanky',
    'large',
    'last',
    'lasting',
    'late',
    'laughable',
    'lavish',
    'lawful',
    'lazy',
    'leading',
    'leafy',
    'lean',
    'learned',
    'left',
    'legal',
    'legitimate',
    'lethal',
    'level',
    'lewd',
    'light',
    'lighthearted',
    'likable',
    'like',
    'likeable',
    'likely',
    'limited',
    'limp',
    'limping',
    'linear',
    'lined',
    'liquid',
    'literate',
    'little',
    'live',
    'lively',
    'livid',
    'living',
    'loathsome',
    'lone',
    'lonely',
    'long',
    'longing',
    'long-term',
    'loose',
    'lopsided',
    'lost',
    'loud',
    'loutish',
    'lovable',
    'lovely',
    'loving',
    'low',
    'lowly',
    'loyal',
    'lucky',
    'ludicrous',
    'lumbering',
    'luminous',
    'lumpy',
    'lush',
    'lustrous',
    'luxuriant',
    'luxurious',
    'lying',
    'lyrical',
    'macabre',
    'macho',
    'mad',
    'maddening',
    'made-up',
    'madly',
    'magenta',
    'magical',
    'magnificent',
    'majestic',
    'major',
    'makeshift',
    'male',
    'malicious',
    'mammoth',
    'maniacal',
    'many',
    'marked',
    'married',
    'marvelous',
    'masculine',
    'massive',
    'material',
    'materialistic',
    'mature',
    'meager',
    'mealy',
    'mean',
    'measly',
    'meaty',
    'medical',
    'mediocre',
    'medium',
    'meek',
    'melancholy',
    'mellow',
    'melodic',
    'melted',
    'memorable',
    'menacing',
    'merciful',
    'mere',
    'merry',
    'messy',
    'metallic',
    'mighty',
    'mild',
    'military',
    'milky',
    'mindless',
    'miniature',
    'minor',
    'minty',
    'minute',
    'miscreant',
    'miserable',
    'miserly',
    'misguided',
    'mistaken',
    'misty',
    'mixed',
    'moaning',
    'modern',
    'modest',
    'moist',
    'moldy',
    'momentous',
    'monstrous',
    'monthly',
    'monumental',
    'moody',
    'moral',
    'mortified',
    'motherly',
    'motionless',
    'mountainous',
    'muddled',
    'muddy',
    'muffled',
    'multicolored',
    'mundane',
    'mundane',
    'murky',
    'mushy',
    'musty',
    'mute',
    'muted',
    'mysterious',
    'naive',
    'nappy',
    'narrow',
    'nasty',
    'natural',
    'naughty',
    'nauseating',
    'nautical',
    'near',
    'neat',
    'nebulous',
    'necessary',
    'needless',
    'needy',
    'negative',
    'neglected',
    'negligible',
    'neighboring',
    'neighborly',
    'nervous',
    'nervous',
    'new',
    'next',
    'nice',
    'nice',
    'nifty',
    'nimble',
    'nine',
    'nippy',
    'nocturnal',
    'noiseless',
    'noisy',
    'nonchalant',
    'nondescript',
    'nonsensical',
    'nonstop',
    'normal',
    'nostalgic',
    'nosy',
    'notable',
    'noted',
    'noteworthy',
    'novel',
    'noxious',
    'null',
    'numb',
    'numberless',
    'numerous',
    'nutritious',
    'nutty',
    'oafish',
    'obedient',
    'obeisant',
    'obese',
    'oblivious',
    'oblong',
    'obnoxious',
    'obscene',
    'obsequious',
    'observant',
    'obsolete',
    'obtainable',
    'obvious',
    'occasional',
    'oceanic',
    'odd',
    'oddball',
    'offbeat',
    'offensive',
    'official',
    'oily',
    'old',
    'old-fashioned',
    'omniscient',
    'one',
    'onerous',
    'only',
    'open',
    'opposite',
    'optimal',
    'optimistic',
    'opulent',
    'orange',
    'orderly',
    'ordinary',
    'organic',
    'original',
    'ornate',
    'ornery',
    'ossified',
    'other',
    'our',
    'outgoing',
    'outlandish',
    'outlying',
    'outrageous',
    'outstanding',
    'oval',
    'overconfident',
    'overcooked',
    'overdue',
    'overjoyed',
    'overlooked',
    'overrated',
    'overt',
    'overwrought',
    'painful',
    'painstaking',
    'palatable',
    'pale',
    'paltry',
    'panicky',
    'panoramic',
    'parallel',
    'parched',
    'parsimonious',
    'partial',
    'passionate',
    'past',
    'pastel',
    'pastoral',
    'pathetic',
    'peaceful',
    'penitent',
    'peppery',
    'perfect',
    'perfumed',
    'periodic',
    'perky',
    'permissible',
    'perpetual',
    'perplexed',
    'personal',
    'pertinent',
    'pesky',
    'pessimistic',
    'petite',
    'petty',
    'petty',
    'phobic',
    'phony',
    'physical',
    'picayune',
    'piercing',
    'pink',
    'piquant',
    'pitiful',
    'placid',
    'plain',
    'plaintive',
    'plant',
    'plastic',
    'plausible',
    'playful',
    'pleasant',
    'pleased',
    'pleasing',
    'plucky',
    'plump',
    'plush',
    'pointed',
    'pointless',
    'poised',
    'polished',
    'polite',
    'political',
    'pompous',
    'poor',
    'popular',
    'portly',
    'posh',
    'positive',
    'possessive',
    'possible',
    'potable',
    'powerful',
    'powerless',
    'practical',
    'precious',
    'premium',
    'present',
    'present',
    'prestigious',
    'pretty',
    'previous',
    'pricey',
    'prickly',
    'primary',
    'prime',
    'pristine',
    'private',
    'prize',
    'probable',
    'productive',
    'profitable',
    'profuse',
    'proper',
    'protective',
    'proud',
    'prudent',
    'psychedelic',
    'psychotic',
    'public',
    'puffy',
    'pumped',
    'punctual',
    'pungent',
    'puny',
    'pure',
    'purple',
    'purring',
    'pushy',
    'pushy',
    'putrid',
    'puzzled',
    'puzzling',
    'quack',
    'quaint',
    'quaint',
    'qualified',
    'quarrelsome',
    'quarterly',
    'queasy',
    'querulous',
    'questionable',
    'quick',
    'quickest',
    'quick-witted',
    'quiet',
    'quintessential',
    'quirky',
    'quixotic',
    'quixotic',
    'quizzical',
    'rabid',
    'racial',
    'radiant',
    'ragged',
    'rainy',
    'rambunctious',
    'rampant',
    'rapid',
    'rare',
    'rash',
    'raspy',
    'ratty',
    'raw',
    'ready',
    'real',
    'realistic',
    'reasonable',
    'rebel',
    'recent',
    'receptive',
    'reckless',
    'recondite',
    'rectangular',
    'red',
    'redundant',
    'reflecting',
    'reflective',
    'regal',
    'regular',
    'reliable',
    'relieved',
    'remarkable',
    'reminiscent',
    'remorseful',
    'remote',
    'repentant',
    'repulsive',
    'required',
    'resolute',
    'resonant',
    'respectful',
    'responsible',
    'responsive',
    'revolving',
    'rewarding',
    'rhetorical',
    'rich',
    'right',
    'righteous',
    'rightful',
    'rigid',
    'ringed',
    'ripe',
    'ritzy',
    'roasted',
    'robust',
    'romantic',
    'roomy',
    'rosy',
    'rotating',
    'rotten',
    'rotund',
    'rough',
    'round',
    'rowdy',
    'royal',
    'rubbery',
    'ruddy',
    'rude',
    'rundown',
    'runny',
    'rural',
    'rustic  rusty',
    'ruthless',
    'sable',
    'sad',
    'safe',
    'salty',
    'same',
    'sandy',
    'sane',
    'sarcastic',
    'sardonic',
    'sassy',
    'satisfied',
    'satisfying',
    'savory',
    'scaly',
    'scandalous',
    'scant',
    'scarce',
    'scared',
    'scary',
    'scattered',
    'scented',
    'scholarly',
    'scientific',
    'scintillating',
    'scornful',
    'scratchy',
    'scrawny',
    'screeching',
    'second',
    'secondary',
    'second-hand',
    'secret',
    'secretive',
    'sedate',
    'seemly',
    'selective',
    'self-assured',
    'selfish',
    'self-reliant',
    'sentimental',
    'separate',
    'serene',
    'serious',
    'serpentine',
    'several',
    'severe',
    'shabby',
    'shadowy',
    'shady',
    'shaggy',
    'shaky',
    'shallow',
    'shameful',
    'shameless',
    'sharp',
    'shimmering',
    'shiny',
    'shivering',
    'shocked',
    'shocking',
    'shoddy',
    'short',
    'short-term',
    'showy',
    'shrill',
    'shut',
    'shy',
    'sick',
    'silent',
    'silky',
    'silly',
    'silver',
    'similar',
    'simple',
    'simplistic',
    'sincere',
    'sinful',
    'single',
    'six',
    'sizzling',
    'skeletal',
    'skillful',
    'skinny',
    'sleepy',
    'slight',
    'slim',
    'slimy',
    'slippery',
    'sloppy',
    'slow',
    'slushy',
    'small',
    'smarmy',
    'smart',
    'smelly',
    'smiling',
    'smoggy',
    'smooth',
    'smug',
    'snappy',
    'snarling',
    'sneaky',
    'sniveling',
    'snobbish',
    'snoopy',
    'snotty',
    'sociable',
    'soft',
    'soggy',
    'solid',
    'somber',
    'some',
    'sophisticated',
    'sordid',
    'sore',
    'sorrowful',
    'soulful',
    'soupy',
    'sour',
    'sour',
    'spanish',
    'sparkling',
    'sparse',
    'special',
    'specific',
    'spectacular',
    'speedy',
    'spherical',
    'spicy',
    'spiffy',
    'spiky',
    'spirited',
    'spiritual',
    'spiteful',
    'splendid',
    'spooky',
    'spotless',
    'spotted',
    'spotty',
    'spry',
    'spurious',
    'squalid',
    'square',
    'squeaky',
    'squealing',
    'squeamish',
    'squiggly',
    'stable',
    'staid',
    'stained',
    'staking',
    'stale',
    'standard',
    'standing',
    'starchy',
    'stark',
    'starry',
    'statuesque',
    'steadfast',
    'steady',
    'steel',
    'steep',
    'stereotyped',
    'sticky',
    'stiff',
    'stimulating',
    'stingy',
    'stormy',
    'stout',
    'straight',
    'strange',
    'strict',
    'strident',
    'striking',
    'striped',
    'strong',
    'studious',
    'stunning',
    'stunning',
    'stupendous',
    'stupid',
    'sturdy',
    'stylish',
    'subdued',
    'submissive',
    'subsequent',
    'substantial',
    'subtle',
    'suburban',
    'successful',
    'succinct',
    'succulent',
    'sudden',
    'sugary',
    'sulky',
    'sunny',
    'super',
    'superb',
    'superficial',
    'superior',
    'supportive',
    'supreme',
    'sure-footed',
    'surprised',
    'suspicious',
    'svelte',
    'swanky',
    'sweaty',
    'sweet',
    'sweltering',
    'swift',
    'sympathetic',
    'symptomatic',
    'synonymous',
    'taboo',
    'tacit',
    'tacky',
    'talented',
    'talkative',
    'tall',
    'tame',
    'tan',
    'tangible',
    'tangy',
    'tart',
    'tasteful',
    'tasteless',
    'tasty',
    'tattered',
    'taut',
    'tawdry',
    'tearful',
    'tedious',
    'teeming',
    'teeny',
    'teeny-tiny',
    'telling',
    'temporary',
    'tempting',
    'ten',
    'tender',
    'tense',
    'tenuous',
    'tepid',
    'terrible',
    'terrific',
    'tested',
    'testy',
    'thankful',
    'that',
    'therapeutic',
    'these',
    'thick',
    'thin',
    'thinkable',
    'third',
    'thirsty',
    'this',
    'thorny',
    'thorough',
    'those',
    'thoughtful',
    'thoughtless',
    'threadbare',
    'threatening',
    'three',
    'thrifty',
    'thundering',
    'thunderous',
    'tidy',
    'tight',
    'tightfisted',
    'timely',
    'tinted',
    'tiny',
    'tired',
    'tiresome',
    'toothsome',
    'torn',
    'torpid',
    'total',
    'tough',
    'towering',
    'tragic',
    'trained',
    'tranquil',
    'trashy',
    'traumatic',
    'treasured',
    'tremendous',
    'triangular',
    'tricky',
    'trifling',
    'trim',
    'trite',
    'trivial',
    'troubled',
    'truculent',
    'true',
    'trusting',
    'trustworthy',
    'trusty',
    'truthful',
    'tubby',
    'turbulent',
    'twin',
    'two',
    'typical',
    'ubiquitous',
    'ugliest',
    'ugly',
    'ultimate',
    'ultra',
    'unable',
    'unaccountable',
    'unarmed',
    'unaware',
    'unbecoming',
    'unbiased',
    'uncomfortable',
    'uncommon',
    'unconscious',
    'uncovered',
    'understated',
    'understood',
    'undesirable',
    'unequal',
    'unequaled',
    'uneven',
    'unfinished',
    'unfit',
    'unfolded',
    'unfortunate',
    'unhappy',
    'unhealthy',
    'uniform',
    'unimportant',
    'uninterested',
    'unique',
    'united',
    'unkempt',
    'unknown',
    'unlawful',
    'unlined',
    'unlucky',
    'unnatural',
    'unpleasant',
    'unrealistic',
    'unripe',
    'unruly',
    'unselfish',
    'unsightly',
    'unsteady',
    'unsuitable',
    'unsung',
    'untidy',
    'untimely',
    'untried',
    'untrue',
    'unused',
    'unusual',
    'unwelcome',
    'unwieldy',
    'unwitting',
    'unwritten',
    'upbeat',
    'uppity',
    'upright',
    'upset',
    'uptight',
    'urban',
    'usable',
    'used',
    'used',
    'useful',
    'useless',
    'utilized',
    'utopian',
    'utter',
    'uttermost',
    'vacant',
    'vacuous',
    'vagabond',
    'vague',
    'vain',
    'valid',
    'valuable',
    'vapid',
    'variable',
    'various',
    'vast',
    'velvety',
    'venerated',
    'vengeful',
    'venomous',
    'verdant',
    'verifiable',
    'versed',
    'vexed',
    'vibrant',
    'vicious',
    'victorious',
    'vigilant',
    'vigorous',
    'villainous',
    'violent',
    'violet',
    'virtual',
    'virtuous',
    'visible',
    'vital',
    'vivacious',
    'vivid',
    'voiceless',
    'volatile',
    'voluminous',
    'voracious',
    'vulgar',
    'wacky',
    'waggish',
    'waiting',
    'wakeful',
    'wan',
    'wandering',
    'wanting',
    'warlike',
    'warm',
    'warmhearted',
    'warped',
    'wary',
    'wasteful',
    'watchful',
    'waterlogged',
    'watery',
    'wavy',
    'weak',
    'wealthy',
    'weary',
    'webbed',
    'wee',
    'weekly',
    'weepy',
    'weighty',
    'weird',
    'welcome',
    'well-documented',
    'well-groomed',
    'well-informed',
    'well-lit',
    'well-made',
    'well-off',
    'well-to-do',
    'well-worn',
    'wet',
    'which',
    'whimsical',
    'whirlwind',
    'whispered',
    'whispering',
    'white',
    'whole',
    'wholesale',
    'whopping',
    'wicked',
    'wide',
    'wide-eyed',
    'wiggly',
    'wild',
    'willing',
    'wilted',
    'winding',
    'windy',
    'winged',
    'wiry',
    'wise',
    'wistful',
    'witty',
    'wobbly',
    'woebegone',
    'woeful',
    'womanly',
    'wonderful',
    'wooden',
    'woozy',
    'wordy',
    'workable',
    'worldly',
    'worn',
    'worried',
    'worrisome',
    'worse',
    'worst',
    'worthless',
    'worthwhile',
    'worthy',
    'wrathful',
    'wretched',
    'writhing',
    'wrong',
    'wry',
    'xenophobic',
    'yawning',
    'yearly',
    'yellow',
    'yellowish',
    'yielding',
    'young',
    'youthful',
    'yummy',
    'zany',
    'zealous',
    'zesty',
    'zigzag',
    'zippy',
    'zonked',
];

function pickRandom(array) {
    return array[~~(Math.random() * array.length)];
}

function nameyMcNameface(mcMode) {
    if (mcMode === void 0) mcMode = false;

    var animal = pickRandom(animals);
    if (mcMode) {
        animal = 'mc' + animal.substr(0, 1).toUpperCase() + animal.substr(1);
    }

    return pickRandom(adjectives) + '-' + animal;
}

function normalizeHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html
    .replace(/<link.+\/?>/g, '')
    .replace(/<!--.+?-->/g, '')
    .replace(/<!---->/g, '')
    .replace(/<object.+\/object>/g, '')
    .replace(/svelte-ref-\w+/g, '')
    .replace(/\s*svelte-\w+\s*/g, '')
    .replace(/class=""/g, '')
    .replace(/style=""/g, '')
    .replace(/>\s+/g, '>')
    .replace(/\s+</g, '<');

  indent(div, '');

  div.normalize();
  return div.innerHTML;
}

function indent(node, spaces) {
  if (node.childNodes.length === 0) return;

  if (node.childNodes.length > 1 || node.childNodes[0].nodeType !== 3) {
    const first = node.childNodes[0];
    const last = node.childNodes[node.childNodes.length - 1];

    const head = `\n${spaces}  `;
    const tail = `\n${spaces}`;

    if (first.nodeType === 3) {
      first.data = `${head}${first.data}`;
    } else {
      node.insertBefore(document.createTextNode(head), first);
    }

    if (last.nodeType === 3) {
      last.data = `${last.data}${tail}`;
    } else {
      node.appendChild(document.createTextNode(tail));
    }

    let lastType = null;
    for (let i = 0; i < node.childNodes.length; i += 1) {
      const child = node.childNodes[i];
      if (child.nodeType === 1) {
        indent(node.childNodes[i], `${spaces}  `);

        if (lastType === 1) {
          node.insertBefore(document.createTextNode(head), child);
          i += 1;
        }
      }

      lastType = child.nodeType;
    }
  }
}

function noop() { }
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function set_custom_element_data(node, prop, value) {
    if (prop in node) {
        node[prop] = value;
    }
    else {
        attr(node, prop, value);
    }
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== 'undefined' && window.parent) {
                void window.parent.document;
            }
        }
        catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    if (computed_style.position === 'static') {
        node.style.position = 'relative';
    }
    const iframe = element('iframe');
    iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
        'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    const crossorigin = is_crossorigin();
    let unsubscribe;
    if (crossorigin) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
        unsubscribe = listen(window, 'message', (event) => {
            if (event.source === iframe.contentWindow)
                fn();
        });
    }
    else {
        iframe.src = 'about:blank';
        iframe.onload = () => {
            unsubscribe = listen(iframe.contentWindow, 'resize', fn);
        };
    }
    append(node, iframe);
    return () => {
        if (crossorigin) {
            unsubscribe();
        }
        else if (unsubscribe && iframe.contentWindow) {
            unsubscribe();
        }
        detach(iframe);
    };
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}
class HtmlTag {
    constructor(anchor = null) {
        this.a = anchor;
        this.e = this.n = null;
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            this.e = element(target.nodeName);
            this.t = target;
            this.h(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function beforeUpdate(fn) {
    get_current_component().$$.before_update.push(fn);
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.35.0' }, detail)));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

/* test/src/CustomItem.svelte generated by Svelte v3.35.0 */

const file$d = "test/src/CustomItem.svelte";

function add_css$8() {
	var style = element("style");
	style.id = "svelte-1vo37vn-style";
	style.textContent = ".customItem.svelte-1vo37vn{display:flex;align-items:center;cursor:default;height:40px;line-height:40px;padding:0 16px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.customItem.svelte-1vo37vn:active{background:#b9daff}.customItem.active.svelte-1vo37vn{background:#007aff;color:#fff}.customItem.first.svelte-1vo37vn{border-radius:4px 4px 0 0}.customItem.hover.svelte-1vo37vn:not(.active){background:#e7f2ff}img.svelte-1vo37vn{width:5px;padding:5px 0;margin:0 10px}.customItem_title.svelte-1vo37vn{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.customItem_name.svelte-1vo37vn{display:inline-block;font-weight:700;margin-right:10px}.customItem_tagline.svelte-1vo37vn{display:inline-block}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tSXRlbS5zdmVsdGUiLCJzb3VyY2VzIjpbIkN1c3RvbUl0ZW0uc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gIGV4cG9ydCBsZXQgaXNBY3RpdmUgPSBmYWxzZTtcbiAgZXhwb3J0IGxldCBpc0ZpcnN0ID0gZmFsc2U7XG4gIGV4cG9ydCBsZXQgaXNIb3ZlciA9IGZhbHNlO1xuICBleHBvcnQgbGV0IGl0ZW0gPSB1bmRlZmluZWQ7XG5cbiAgbGV0IGl0ZW1DbGFzc2VzID0gJyc7XG5cbiAgJDoge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICBpZiAoaXNBY3RpdmUpIHsgY2xhc3Nlcy5wdXNoKCdhY3RpdmUnKTsgfVxuICAgIGlmIChpc0ZpcnN0KSB7IGNsYXNzZXMucHVzaCgnZmlyc3QnKTsgfVxuICAgIGlmIChpc0hvdmVyKSB7IGNsYXNzZXMucHVzaCgnaG92ZXInKTsgfVxuICAgIGl0ZW1DbGFzc2VzID0gY2xhc3Nlcy5qb2luKCcgJyk7XG4gIH1cblxuPC9zY3JpcHQ+XG5cbjxkaXYgY2xhc3M9XCJjdXN0b21JdGVtIHtpdGVtQ2xhc3Nlc31cIj5cbiAgPGltZyBzcmM9XCJ7aXRlbS5pbWFnZV91cmx9XCIgYWx0PVwie2l0ZW0ubmFtZX1cIj5cbiAgPGRpdiBjbGFzcz1cImN1c3RvbUl0ZW1fdGl0bGVcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY3VzdG9tSXRlbV9uYW1lXCI+e2l0ZW0ubmFtZX08L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY3VzdG9tSXRlbV90YWdsaW5lXCI+e2l0ZW0udGFnbGluZX08L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPHN0eWxlPlxuICAuY3VzdG9tSXRlbSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDQwcHg7XG4gICAgcGFkZGluZzogMCAxNnB4O1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgfVxuXG4gIC5jdXN0b21JdGVtOmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogI2I5ZGFmZjtcbiAgfVxuXG4gIC5jdXN0b21JdGVtLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogIzAwN2FmZjtcbiAgICBjb2xvcjogI2ZmZjtcbiAgfVxuXG4gIC5jdXN0b21JdGVtLmZpcnN0IHtcbiAgICBib3JkZXItcmFkaXVzOiA0cHggNHB4IDAgMDtcbiAgfVxuXG4gIC5jdXN0b21JdGVtLmhvdmVyOm5vdCguYWN0aXZlKSB7XG4gICAgYmFja2dyb3VuZDogI2U3ZjJmZjtcbiAgfVxuXG4gIGltZyB7XG4gICAgd2lkdGg6IDVweDtcbiAgICBwYWRkaW5nOiA1cHggMDtcbiAgICBtYXJnaW46IDAgMTBweDtcbiAgfVxuXG4gIC5jdXN0b21JdGVtX3RpdGxlIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIH1cblxuICAuY3VzdG9tSXRlbV9uYW1lIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIH1cblxuICAuY3VzdG9tSXRlbV90YWdsaW5lIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIH1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkJFLFdBQVcsZUFBQyxDQUFDLEFBQ1gsT0FBTyxDQUFFLElBQUksQ0FDYixXQUFXLENBQUUsTUFBTSxDQUNuQixNQUFNLENBQUUsT0FBTyxDQUNmLE1BQU0sQ0FBRSxJQUFJLENBQ1osV0FBVyxDQUFFLElBQUksQ0FDakIsT0FBTyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQ2YsYUFBYSxDQUFFLFFBQVEsQ0FDdkIsUUFBUSxDQUFFLE1BQU0sQ0FDaEIsV0FBVyxDQUFFLE1BQU0sQUFDckIsQ0FBQyxBQUVELDBCQUFXLE9BQU8sQUFBQyxDQUFDLEFBQ2xCLFVBQVUsQ0FBRSxPQUFPLEFBQ3JCLENBQUMsQUFFRCxXQUFXLE9BQU8sZUFBQyxDQUFDLEFBQ2xCLFVBQVUsQ0FBRSxPQUFPLENBQ25CLEtBQUssQ0FBRSxJQUFJLEFBQ2IsQ0FBQyxBQUVELFdBQVcsTUFBTSxlQUFDLENBQUMsQUFDakIsYUFBYSxDQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQUFDNUIsQ0FBQyxBQUVELFdBQVcscUJBQU0sS0FBSyxPQUFPLENBQUMsQUFBQyxDQUFDLEFBQzlCLFVBQVUsQ0FBRSxPQUFPLEFBQ3JCLENBQUMsQUFFRCxHQUFHLGVBQUMsQ0FBQyxBQUNILEtBQUssQ0FBRSxHQUFHLENBQ1YsT0FBTyxDQUFFLEdBQUcsQ0FBQyxDQUFDLENBQ2QsTUFBTSxDQUFFLENBQUMsQ0FBQyxJQUFJLEFBQ2hCLENBQUMsQUFFRCxpQkFBaUIsZUFBQyxDQUFDLEFBQ2pCLFFBQVEsQ0FBRSxNQUFNLENBQ2hCLGFBQWEsQ0FBRSxRQUFRLENBQ3ZCLFdBQVcsQ0FBRSxNQUFNLEFBQ3JCLENBQUMsQUFFRCxnQkFBZ0IsZUFBQyxDQUFDLEFBQ2hCLE9BQU8sQ0FBRSxZQUFZLENBQ3JCLFdBQVcsQ0FBRSxHQUFHLENBQ2hCLFlBQVksQ0FBRSxJQUFJLEFBQ3BCLENBQUMsQUFFRCxtQkFBbUIsZUFBQyxDQUFDLEFBQ25CLE9BQU8sQ0FBRSxZQUFZLEFBQ3ZCLENBQUMifQ== */";
	append_dev(document.head, style);
}

function create_fragment$d(ctx) {
	let div3;
	let img;
	let img_src_value;
	let img_alt_value;
	let t0;
	let div2;
	let div0;
	let t1_value = /*item*/ ctx[0].name + "";
	let t1;
	let t2;
	let div1;
	let t3_value = /*item*/ ctx[0].tagline + "";
	let t3;
	let div3_class_value;

	const block = {
		c: function create() {
			div3 = element("div");
			img = element("img");
			t0 = space();
			div2 = element("div");
			div0 = element("div");
			t1 = text(t1_value);
			t2 = space();
			div1 = element("div");
			t3 = text(t3_value);
			if (img.src !== (img_src_value = /*item*/ ctx[0].image_url)) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", img_alt_value = /*item*/ ctx[0].name);
			attr_dev(img, "class", "svelte-1vo37vn");
			add_location(img, file$d, 19, 2, 416);
			attr_dev(div0, "class", "customItem_name svelte-1vo37vn");
			add_location(div0, file$d, 21, 4, 500);
			attr_dev(div1, "class", "customItem_tagline svelte-1vo37vn");
			add_location(div1, file$d, 22, 4, 551);
			attr_dev(div2, "class", "customItem_title svelte-1vo37vn");
			add_location(div2, file$d, 20, 2, 465);
			attr_dev(div3, "class", div3_class_value = "customItem " + /*itemClasses*/ ctx[1] + " svelte-1vo37vn");
			add_location(div3, file$d, 18, 0, 375);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div3, anchor);
			append_dev(div3, img);
			append_dev(div3, t0);
			append_dev(div3, div2);
			append_dev(div2, div0);
			append_dev(div0, t1);
			append_dev(div2, t2);
			append_dev(div2, div1);
			append_dev(div1, t3);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*item*/ 1 && img.src !== (img_src_value = /*item*/ ctx[0].image_url)) {
				attr_dev(img, "src", img_src_value);
			}

			if (dirty & /*item*/ 1 && img_alt_value !== (img_alt_value = /*item*/ ctx[0].name)) {
				attr_dev(img, "alt", img_alt_value);
			}

			if (dirty & /*item*/ 1 && t1_value !== (t1_value = /*item*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
			if (dirty & /*item*/ 1 && t3_value !== (t3_value = /*item*/ ctx[0].tagline + "")) set_data_dev(t3, t3_value);

			if (dirty & /*itemClasses*/ 2 && div3_class_value !== (div3_class_value = "customItem " + /*itemClasses*/ ctx[1] + " svelte-1vo37vn")) {
				attr_dev(div3, "class", div3_class_value);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div3);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$d($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("CustomItem", slots, []);
	let { isActive = false } = $$props;
	let { isFirst = false } = $$props;
	let { isHover = false } = $$props;
	let { item = undefined } = $$props;
	let itemClasses = "";
	const writable_props = ["isActive", "isFirst", "isHover", "item"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<CustomItem> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("isActive" in $$props) $$invalidate(2, isActive = $$props.isActive);
		if ("isFirst" in $$props) $$invalidate(3, isFirst = $$props.isFirst);
		if ("isHover" in $$props) $$invalidate(4, isHover = $$props.isHover);
		if ("item" in $$props) $$invalidate(0, item = $$props.item);
	};

	$$self.$capture_state = () => ({
		isActive,
		isFirst,
		isHover,
		item,
		itemClasses
	});

	$$self.$inject_state = $$props => {
		if ("isActive" in $$props) $$invalidate(2, isActive = $$props.isActive);
		if ("isFirst" in $$props) $$invalidate(3, isFirst = $$props.isFirst);
		if ("isHover" in $$props) $$invalidate(4, isHover = $$props.isHover);
		if ("item" in $$props) $$invalidate(0, item = $$props.item);
		if ("itemClasses" in $$props) $$invalidate(1, itemClasses = $$props.itemClasses);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*isActive, isFirst, isHover*/ 28) {
			{
				const classes = [];

				if (isActive) {
					classes.push("active");
				}

				if (isFirst) {
					classes.push("first");
				}

				if (isHover) {
					classes.push("hover");
				}

				$$invalidate(1, itemClasses = classes.join(" "));
			}
		}
	};

	return [item, itemClasses, isActive, isFirst, isHover];
}

class CustomItem extends SvelteComponentDev {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-1vo37vn-style")) add_css$8();

		init(this, options, instance$d, create_fragment$d, safe_not_equal, {
			isActive: 2,
			isFirst: 3,
			isHover: 4,
			item: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CustomItem",
			options,
			id: create_fragment$d.name
		});
	}

	get isActive() {
		return this.$$.ctx[2];
	}

	set isActive(isActive) {
		this.$set({ isActive });
		flush();
	}

	get isFirst() {
		return this.$$.ctx[3];
	}

	set isFirst(isFirst) {
		this.$set({ isFirst });
		flush();
	}

	get isHover() {
		return this.$$.ctx[4];
	}

	set isHover(isHover) {
		this.$set({ isHover });
		flush();
	}

	get item() {
		return this.$$.ctx[0];
	}

	set item(item) {
		this.$set({ item });
		flush();
	}
}

/* src/Item.svelte generated by Svelte v3.35.0 */

const file$c = "src/Item.svelte";

function add_css$7() {
	var style = element("style");
	style.id = "svelte-1imzpmp-style";
	style.textContent = ".item.svelte-1imzpmp{cursor:default;height:var(--height, 42px);line-height:var(--height, 42px);padding:var(--itemPadding, 0 20px);color:var(--itemColor, inherit);text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.groupHeader.svelte-1imzpmp{text-transform:var(--groupTitleTextTransform, uppercase)}.groupItem.svelte-1imzpmp{padding-left:var(--groupItemPaddingLeft, 40px)}.item.svelte-1imzpmp:active{background:var(--itemActiveBackground, #b9daff)}.item.active.svelte-1imzpmp{background:var(--itemIsActiveBG, #007aff);color:var(--itemIsActiveColor, #fff)}.item.first.svelte-1imzpmp{border-radius:var(--itemFirstBorderRadius, 4px 4px 0 0)}.item.hover.svelte-1imzpmp:not(.active){background:var(--itemHoverBG, #e7f2ff)}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXRlbS5zdmVsdGUiLCJzb3VyY2VzIjpbIkl0ZW0uc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gICAgZXhwb3J0IGxldCBpc0FjdGl2ZSA9IGZhbHNlO1xuICAgIGV4cG9ydCBsZXQgaXNGaXJzdCA9IGZhbHNlO1xuICAgIGV4cG9ydCBsZXQgaXNIb3ZlciA9IGZhbHNlO1xuICAgIGV4cG9ydCBsZXQgZ2V0T3B0aW9uTGFiZWwgPSB1bmRlZmluZWQ7XG4gICAgZXhwb3J0IGxldCBpdGVtID0gdW5kZWZpbmVkO1xuICAgIGV4cG9ydCBsZXQgZmlsdGVyVGV4dCA9ICcnO1xuXG4gICAgbGV0IGl0ZW1DbGFzc2VzID0gJyc7XG5cbiAgICAkOiB7XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0ZpcnN0KSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2ZpcnN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzSG92ZXIpIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnaG92ZXInKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbS5pc0dyb3VwSGVhZGVyKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2goJ2dyb3VwSGVhZGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0uaXNHcm91cEl0ZW0pIHtcbiAgICAgICAgICAgIGNsYXNzZXMucHVzaCgnZ3JvdXBJdGVtJyk7XG4gICAgICAgIH1cbiAgICAgICAgaXRlbUNsYXNzZXMgPSBjbGFzc2VzLmpvaW4oJyAnKTtcbiAgICB9XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAgIC5pdGVtIHtcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWhlaWdodCwgNDJweCk7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiB2YXIoLS1oZWlnaHQsIDQycHgpO1xuICAgICAgICBwYWRkaW5nOiB2YXIoLS1pdGVtUGFkZGluZywgMCAyMHB4KTtcbiAgICAgICAgY29sb3I6IHZhcigtLWl0ZW1Db2xvciwgaW5oZXJpdCk7XG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIH1cblxuICAgIC5ncm91cEhlYWRlciB7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB2YXIoLS1ncm91cFRpdGxlVGV4dFRyYW5zZm9ybSwgdXBwZXJjYXNlKTtcbiAgICB9XG5cbiAgICAuZ3JvdXBJdGVtIHtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiB2YXIoLS1ncm91cEl0ZW1QYWRkaW5nTGVmdCwgNDBweCk7XG4gICAgfVxuXG4gICAgLml0ZW06YWN0aXZlIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taXRlbUFjdGl2ZUJhY2tncm91bmQsICNiOWRhZmYpO1xuICAgIH1cblxuICAgIC5pdGVtLmFjdGl2ZSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWl0ZW1Jc0FjdGl2ZUJHLCAjMDA3YWZmKTtcbiAgICAgICAgY29sb3I6IHZhcigtLWl0ZW1Jc0FjdGl2ZUNvbG9yLCAjZmZmKTtcbiAgICB9XG5cbiAgICAuaXRlbS5maXJzdCB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWl0ZW1GaXJzdEJvcmRlclJhZGl1cywgNHB4IDRweCAwIDApO1xuICAgIH1cblxuICAgIC5pdGVtLmhvdmVyOm5vdCguYWN0aXZlKSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWl0ZW1Ib3ZlckJHLCAjZTdmMmZmKTtcbiAgICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwiaXRlbSB7aXRlbUNsYXNzZXN9XCI+XG4gICAge0BodG1sIGdldE9wdGlvbkxhYmVsKGl0ZW0sIGZpbHRlclRleHQpfVxuPC9kaXY+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0NJLEtBQUssZUFBQyxDQUFDLEFBQ0gsTUFBTSxDQUFFLE9BQU8sQ0FDZixNQUFNLENBQUUsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQzNCLFdBQVcsQ0FBRSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FDaEMsT0FBTyxDQUFFLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUNuQyxLQUFLLENBQUUsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQ2hDLGFBQWEsQ0FBRSxRQUFRLENBQ3ZCLFFBQVEsQ0FBRSxNQUFNLENBQ2hCLFdBQVcsQ0FBRSxNQUFNLEFBQ3ZCLENBQUMsQUFFRCxZQUFZLGVBQUMsQ0FBQyxBQUNWLGNBQWMsQ0FBRSxJQUFJLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxBQUM3RCxDQUFDLEFBRUQsVUFBVSxlQUFDLENBQUMsQUFDUixZQUFZLENBQUUsSUFBSSxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQUFDbkQsQ0FBQyxBQUVELG9CQUFLLE9BQU8sQUFBQyxDQUFDLEFBQ1YsVUFBVSxDQUFFLElBQUksc0JBQXNCLENBQUMsUUFBUSxDQUFDLEFBQ3BELENBQUMsQUFFRCxLQUFLLE9BQU8sZUFBQyxDQUFDLEFBQ1YsVUFBVSxDQUFFLElBQUksZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQzFDLEtBQUssQ0FBRSxJQUFJLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxBQUN6QyxDQUFDLEFBRUQsS0FBSyxNQUFNLGVBQUMsQ0FBQyxBQUNULGFBQWEsQ0FBRSxJQUFJLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxBQUM1RCxDQUFDLEFBRUQsS0FBSyxxQkFBTSxLQUFLLE9BQU8sQ0FBQyxBQUFDLENBQUMsQUFDdEIsVUFBVSxDQUFFLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxBQUMzQyxDQUFDIn0= */";
	append_dev(document.head, style);
}

function create_fragment$c(ctx) {
	let div;
	let raw_value = /*getOptionLabel*/ ctx[0](/*item*/ ctx[1], /*filterText*/ ctx[2]) + "";
	let div_class_value;

	const block = {
		c: function create() {
			div = element("div");
			attr_dev(div, "class", div_class_value = "item " + /*itemClasses*/ ctx[3] + " svelte-1imzpmp");
			add_location(div, file$c, 69, 0, 1585);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			div.innerHTML = raw_value;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*getOptionLabel, item, filterText*/ 7 && raw_value !== (raw_value = /*getOptionLabel*/ ctx[0](/*item*/ ctx[1], /*filterText*/ ctx[2]) + "")) div.innerHTML = raw_value;
			if (dirty & /*itemClasses*/ 8 && div_class_value !== (div_class_value = "item " + /*itemClasses*/ ctx[3] + " svelte-1imzpmp")) {
				attr_dev(div, "class", div_class_value);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$c($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Item", slots, []);
	let { isActive = false } = $$props;
	let { isFirst = false } = $$props;
	let { isHover = false } = $$props;
	let { getOptionLabel = undefined } = $$props;
	let { item = undefined } = $$props;
	let { filterText = "" } = $$props;
	let itemClasses = "";
	const writable_props = ["isActive", "isFirst", "isHover", "getOptionLabel", "item", "filterText"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Item> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("isActive" in $$props) $$invalidate(4, isActive = $$props.isActive);
		if ("isFirst" in $$props) $$invalidate(5, isFirst = $$props.isFirst);
		if ("isHover" in $$props) $$invalidate(6, isHover = $$props.isHover);
		if ("getOptionLabel" in $$props) $$invalidate(0, getOptionLabel = $$props.getOptionLabel);
		if ("item" in $$props) $$invalidate(1, item = $$props.item);
		if ("filterText" in $$props) $$invalidate(2, filterText = $$props.filterText);
	};

	$$self.$capture_state = () => ({
		isActive,
		isFirst,
		isHover,
		getOptionLabel,
		item,
		filterText,
		itemClasses
	});

	$$self.$inject_state = $$props => {
		if ("isActive" in $$props) $$invalidate(4, isActive = $$props.isActive);
		if ("isFirst" in $$props) $$invalidate(5, isFirst = $$props.isFirst);
		if ("isHover" in $$props) $$invalidate(6, isHover = $$props.isHover);
		if ("getOptionLabel" in $$props) $$invalidate(0, getOptionLabel = $$props.getOptionLabel);
		if ("item" in $$props) $$invalidate(1, item = $$props.item);
		if ("filterText" in $$props) $$invalidate(2, filterText = $$props.filterText);
		if ("itemClasses" in $$props) $$invalidate(3, itemClasses = $$props.itemClasses);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*isActive, isFirst, isHover, item*/ 114) {
			{
				const classes = [];

				if (isActive) {
					classes.push("active");
				}

				if (isFirst) {
					classes.push("first");
				}

				if (isHover) {
					classes.push("hover");
				}

				if (item.isGroupHeader) {
					classes.push("groupHeader");
				}

				if (item.isGroupItem) {
					classes.push("groupItem");
				}

				$$invalidate(3, itemClasses = classes.join(" "));
			}
		}
	};

	return [getOptionLabel, item, filterText, itemClasses, isActive, isFirst, isHover];
}

class Item extends SvelteComponentDev {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-1imzpmp-style")) add_css$7();

		init(this, options, instance$c, create_fragment$c, safe_not_equal, {
			isActive: 4,
			isFirst: 5,
			isHover: 6,
			getOptionLabel: 0,
			item: 1,
			filterText: 2
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Item",
			options,
			id: create_fragment$c.name
		});
	}

	get isActive() {
		return this.$$.ctx[4];
	}

	set isActive(isActive) {
		this.$set({ isActive });
		flush();
	}

	get isFirst() {
		return this.$$.ctx[5];
	}

	set isFirst(isFirst) {
		this.$set({ isFirst });
		flush();
	}

	get isHover() {
		return this.$$.ctx[6];
	}

	set isHover(isHover) {
		this.$set({ isHover });
		flush();
	}

	get getOptionLabel() {
		return this.$$.ctx[0];
	}

	set getOptionLabel(getOptionLabel) {
		this.$set({ getOptionLabel });
		flush();
	}

	get item() {
		return this.$$.ctx[1];
	}

	set item(item) {
		this.$set({ item });
		flush();
	}

	get filterText() {
		return this.$$.ctx[2];
	}

	set filterText(filterText) {
		this.$set({ filterText });
		flush();
	}
}

/* src/List.svelte generated by Svelte v3.35.0 */
const file$b = "src/List.svelte";

function add_css$6() {
	var style = element("style");
	style.id = "svelte-1wmovev-style";
	style.textContent = ".listContainer.svelte-1wmovev{box-shadow:var(--listShadow, 0 2px 3px 0 rgba(44, 62, 80, 0.24));border-radius:var(--listBorderRadius, 4px);max-height:var(--listMaxHeight, 250px);overflow-y:auto;background:var(--listBackground, #fff)}.virtualList.svelte-1wmovev{height:var(--virtualListHeight, 200px)}.listGroupTitle.svelte-1wmovev{color:var(--groupTitleColor, #8f8f8f);cursor:default;font-size:var(--groupTitleFontSize, 12px);font-weight:var(--groupTitleFontWeight, 600);height:var(--height, 42px);line-height:var(--height, 42px);padding:var(--groupTitlePadding, 0 20px);text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap;text-transform:var(--groupTitleTextTransform, uppercase)}.empty.svelte-1wmovev{text-align:var(--listEmptyTextAlign, center);padding:var(--listEmptyPadding, 20px 0);color:var(--listEmptyColor, #78848f)}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5zdmVsdGUiLCJzb3VyY2VzIjpbIkxpc3Quc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gICAgaW1wb3J0IHsgYmVmb3JlVXBkYXRlLCBjcmVhdGVFdmVudERpc3BhdGNoZXIsIG9uTW91bnQsIHRpY2sgfSBmcm9tICdzdmVsdGUnO1xuICAgIGltcG9ydCBJdGVtQ29tcG9uZW50IGZyb20gJy4vSXRlbS5zdmVsdGUnO1xuXG4gICAgY29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXIoKTtcblxuICAgIGV4cG9ydCBsZXQgY29udGFpbmVyID0gdW5kZWZpbmVkO1xuICAgIGV4cG9ydCBsZXQgVmlydHVhbExpc3Q7XG4gICAgZXhwb3J0IGxldCBJdGVtID0gSXRlbUNvbXBvbmVudDtcbiAgICBleHBvcnQgbGV0IGlzVmlydHVhbExpc3QgPSBmYWxzZTtcbiAgICBleHBvcnQgbGV0IGl0ZW1zID0gW107XG4gICAgZXhwb3J0IGxldCBnZXRPcHRpb25MYWJlbCA9IChvcHRpb24sIGZpbHRlclRleHQpID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbilcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uaXNDcmVhdG9yID8gYENyZWF0ZSBcXFwiJHtmaWx0ZXJUZXh0fVxcXCJgIDogb3B0aW9uLmxhYmVsO1xuICAgIH07XG4gICAgZXhwb3J0IGxldCBnZXRHcm91cEhlYWRlckxhYmVsID0gKG9wdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3B0aW9uLmxhYmVsO1xuICAgIH07XG4gICAgZXhwb3J0IGxldCBpdGVtSGVpZ2h0ID0gNDA7XG4gICAgZXhwb3J0IGxldCBob3Zlckl0ZW1JbmRleCA9IDA7XG4gICAgZXhwb3J0IGxldCB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICBleHBvcnQgbGV0IG9wdGlvbklkZW50aWZpZXIgPSAndmFsdWUnO1xuICAgIGV4cG9ydCBsZXQgaGlkZUVtcHR5U3RhdGUgPSBmYWxzZTtcbiAgICBleHBvcnQgbGV0IG5vT3B0aW9uc01lc3NhZ2UgPSAnTm8gb3B0aW9ucyc7XG4gICAgZXhwb3J0IGxldCBpc011bHRpID0gZmFsc2U7XG4gICAgZXhwb3J0IGxldCBhY3RpdmVJdGVtSW5kZXggPSAwO1xuICAgIGV4cG9ydCBsZXQgZmlsdGVyVGV4dCA9ICcnO1xuXG4gICAgbGV0IGlzU2Nyb2xsaW5nVGltZXIgPSAwO1xuICAgIGxldCBpc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgIGxldCBwcmV2X2l0ZW1zO1xuXG4gICAgb25Nb3VudCgoKSA9PiB7XG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAwICYmICFpc011bHRpICYmIHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBfaG92ZXJJdGVtSW5kZXggPSBpdGVtcy5maW5kSW5kZXgoXG4gICAgICAgICAgICAgICAgKGl0ZW0pID0+XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1bb3B0aW9uSWRlbnRpZmllcl0gPT09IHZhbHVlW29wdGlvbklkZW50aWZpZXJdXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoX2hvdmVySXRlbUluZGV4KSB7XG4gICAgICAgICAgICAgICAgaG92ZXJJdGVtSW5kZXggPSBfaG92ZXJJdGVtSW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzY3JvbGxUb0FjdGl2ZUl0ZW0oJ2FjdGl2ZScpO1xuXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3Njcm9sbCcsXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlzU2Nyb2xsaW5nVGltZXIpO1xuXG4gICAgICAgICAgICAgICAgaXNTY3JvbGxpbmdUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIGJlZm9yZVVwZGF0ZSgoKSA9PiB7XG4gICAgICAgIGlmIChpdGVtcyAhPT0gcHJldl9pdGVtcyAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBob3Zlckl0ZW1JbmRleCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBwcmV2X2l0ZW1zID0gaXRlbXM7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVTZWxlY3QoaXRlbSkge1xuICAgICAgICBpZiAoaXRlbS5pc0NyZWF0b3IpIHJldHVybjtcbiAgICAgICAgZGlzcGF0Y2goJ2l0ZW1TZWxlY3RlZCcsIGl0ZW0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUhvdmVyKGkpIHtcbiAgICAgICAgaWYgKGlzU2Nyb2xsaW5nKSByZXR1cm47XG4gICAgICAgIGhvdmVySXRlbUluZGV4ID0gaTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVDbGljayhhcmdzKSB7XG4gICAgICAgIGNvbnN0IHsgaXRlbSwgaSwgZXZlbnQgfSA9IGFyZ3M7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHZhbHVlICYmXG4gICAgICAgICAgICAhaXNNdWx0aSAmJlxuICAgICAgICAgICAgdmFsdWVbb3B0aW9uSWRlbnRpZmllcl0gPT09IGl0ZW1bb3B0aW9uSWRlbnRpZmllcl1cbiAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIGNsb3NlTGlzdCgpO1xuXG4gICAgICAgIGlmIChpdGVtLmlzQ3JlYXRvcikge1xuICAgICAgICAgICAgZGlzcGF0Y2goJ2l0ZW1DcmVhdGVkJywgZmlsdGVyVGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVJdGVtSW5kZXggPSBpO1xuICAgICAgICAgICAgaG92ZXJJdGVtSW5kZXggPSBpO1xuICAgICAgICAgICAgaGFuZGxlU2VsZWN0KGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VMaXN0KCkge1xuICAgICAgICBkaXNwYXRjaCgnY2xvc2VMaXN0Jyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gdXBkYXRlSG92ZXJJdGVtKGluY3JlbWVudCkge1xuICAgICAgICBpZiAoaXNWaXJ0dWFsTGlzdCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBpc05vblNlbGVjdGFibGVJdGVtID0gdHJ1ZTtcblxuICAgICAgICB3aGlsZSAoaXNOb25TZWxlY3RhYmxlSXRlbSkge1xuICAgICAgICAgICAgaWYgKGluY3JlbWVudCA+IDAgJiYgaG92ZXJJdGVtSW5kZXggPT09IGl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBob3Zlckl0ZW1JbmRleCA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGluY3JlbWVudCA8IDAgJiYgaG92ZXJJdGVtSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICBob3Zlckl0ZW1JbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhvdmVySXRlbUluZGV4ID0gaG92ZXJJdGVtSW5kZXggKyBpbmNyZW1lbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlzTm9uU2VsZWN0YWJsZUl0ZW0gPVxuICAgICAgICAgICAgICAgIGl0ZW1zW2hvdmVySXRlbUluZGV4XS5pc0dyb3VwSGVhZGVyICYmXG4gICAgICAgICAgICAgICAgIWl0ZW1zW2hvdmVySXRlbUluZGV4XS5pc1NlbGVjdGFibGU7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aWNrKCk7XG5cbiAgICAgICAgc2Nyb2xsVG9BY3RpdmVJdGVtKCdob3ZlcicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUtleURvd24oZSkge1xuICAgICAgICBzd2l0Y2ggKGUua2V5KSB7XG4gICAgICAgICAgICBjYXNlICdBcnJvd0Rvd24nOlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBpdGVtcy5sZW5ndGggJiYgdXBkYXRlSG92ZXJJdGVtKDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGl0ZW1zLmxlbmd0aCAmJiB1cGRhdGVIb3Zlckl0ZW0oLTEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSBicmVhaztcbiAgICAgICAgICAgICAgICBjb25zdCBob3Zlckl0ZW0gPSBpdGVtc1tob3Zlckl0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSAmJlxuICAgICAgICAgICAgICAgICAgICAhaXNNdWx0aSAmJlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVtvcHRpb25JZGVudGlmaWVyXSA9PT1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhvdmVySXRlbVtvcHRpb25JZGVudGlmaWVyXVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBjbG9zZUxpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGhvdmVySXRlbS5pc0NyZWF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goJ2l0ZW1DcmVhdGVkJywgZmlsdGVyVGV4dCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlSXRlbUluZGV4ID0gaG92ZXJJdGVtSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVNlbGVjdChpdGVtc1tob3Zlckl0ZW1JbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ1RhYic6XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIGJyZWFrO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgJiZcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVbb3B0aW9uSWRlbnRpZmllcl0gPT09XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtc1tob3Zlckl0ZW1JbmRleF1bb3B0aW9uSWRlbnRpZmllcl1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjbG9zZUxpc3QoKTtcbiAgICAgICAgICAgICAgICBhY3RpdmVJdGVtSW5kZXggPSBob3Zlckl0ZW1JbmRleDtcbiAgICAgICAgICAgICAgICBoYW5kbGVTZWxlY3QoaXRlbXNbaG92ZXJJdGVtSW5kZXhdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvQWN0aXZlSXRlbShjbGFzc05hbWUpIHtcbiAgICAgICAgaWYgKGlzVmlydHVhbExpc3QgfHwgIWNvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgICAgIGxldCBvZmZzZXRCb3VuZGluZztcbiAgICAgICAgY29uc3QgZm9jdXNlZEVsZW1Cb3VuZGluZyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgYC5saXN0SXRlbSAuJHtjbGFzc05hbWV9YFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChmb2N1c2VkRWxlbUJvdW5kaW5nKSB7XG4gICAgICAgICAgICBvZmZzZXRCb3VuZGluZyA9XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbSAtXG4gICAgICAgICAgICAgICAgZm9jdXNlZEVsZW1Cb3VuZGluZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5ib3R0b207XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIuc2Nyb2xsVG9wIC09IG9mZnNldEJvdW5kaW5nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzSXRlbUFjdGl2ZShpdGVtLCB2YWx1ZSwgb3B0aW9uSWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdmFsdWUgJiZcbiAgICAgICAgICAgIHZhbHVlW29wdGlvbklkZW50aWZpZXJdID09PSBpdGVtW29wdGlvbklkZW50aWZpZXJdXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNJdGVtRmlyc3QoaXRlbUluZGV4KSB7XG4gICAgICAgIHJldHVybiBpdGVtSW5kZXggPT09IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNJdGVtSG92ZXIoaG92ZXJJdGVtSW5kZXgsIGl0ZW0sIGl0ZW1JbmRleCwgaXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIGhvdmVySXRlbUluZGV4ID09PSBpdGVtSW5kZXggfHwgaXRlbXMubGVuZ3RoID09PSAxO1xuICAgIH1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gICAgLmxpc3RDb250YWluZXIge1xuICAgICAgICBib3gtc2hhZG93OiB2YXIoLS1saXN0U2hhZG93LCAwIDJweCAzcHggMCByZ2JhKDQ0LCA2MiwgODAsIDAuMjQpKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tbGlzdEJvcmRlclJhZGl1cywgNHB4KTtcbiAgICAgICAgbWF4LWhlaWdodDogdmFyKC0tbGlzdE1heEhlaWdodCwgMjUwcHgpO1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1saXN0QmFja2dyb3VuZCwgI2ZmZik7XG4gICAgfVxuXG4gICAgLnZpcnR1YWxMaXN0IHtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS12aXJ0dWFsTGlzdEhlaWdodCwgMjAwcHgpO1xuICAgIH1cblxuICAgIC5saXN0R3JvdXBUaXRsZSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1ncm91cFRpdGxlQ29sb3IsICM4ZjhmOGYpO1xuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgIGZvbnQtc2l6ZTogdmFyKC0tZ3JvdXBUaXRsZUZvbnRTaXplLCAxMnB4KTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IHZhcigtLWdyb3VwVGl0bGVGb250V2VpZ2h0LCA2MDApO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWhlaWdodCwgNDJweCk7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiB2YXIoLS1oZWlnaHQsIDQycHgpO1xuICAgICAgICBwYWRkaW5nOiB2YXIoLS1ncm91cFRpdGxlUGFkZGluZywgMCAyMHB4KTtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHZhcigtLWdyb3VwVGl0bGVUZXh0VHJhbnNmb3JtLCB1cHBlcmNhc2UpO1xuICAgIH1cblxuICAgIC5lbXB0eSB7XG4gICAgICAgIHRleHQtYWxpZ246IHZhcigtLWxpc3RFbXB0eVRleHRBbGlnbiwgY2VudGVyKTtcbiAgICAgICAgcGFkZGluZzogdmFyKC0tbGlzdEVtcHR5UGFkZGluZywgMjBweCAwKTtcbiAgICAgICAgY29sb3I6IHZhcigtLWxpc3RFbXB0eUNvbG9yLCAjNzg4NDhmKTtcbiAgICB9XG48L3N0eWxlPlxuXG48c3ZlbHRlOndpbmRvdyBvbjprZXlkb3duPXtoYW5kbGVLZXlEb3dufSAvPlxuXG57I2lmIGlzVmlydHVhbExpc3R9XG4gICAgPGRpdiBjbGFzcz1cImxpc3RDb250YWluZXIgdmlydHVhbExpc3RcIiBiaW5kOnRoaXM9e2NvbnRhaW5lcn0+XG4gICAgICAgIDxzdmVsdGU6Y29tcG9uZW50XG4gICAgICAgICAgICB0aGlzPXtWaXJ0dWFsTGlzdH1cbiAgICAgICAgICAgIHtpdGVtc31cbiAgICAgICAgICAgIHtpdGVtSGVpZ2h0fVxuICAgICAgICAgICAgbGV0Oml0ZW1cbiAgICAgICAgICAgIGxldDppXG4gICAgICAgID5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBvbjptb3VzZW92ZXI9eygpID0+IGhhbmRsZUhvdmVyKGkpfVxuICAgICAgICAgICAgICAgIG9uOmNsaWNrPXsoZXZlbnQpID0+IGhhbmRsZUNsaWNrKHsgaXRlbSwgaSwgZXZlbnQgfSl9XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJsaXN0SXRlbVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHN2ZWx0ZTpjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgdGhpcz17SXRlbX1cbiAgICAgICAgICAgICAgICAgICAge2l0ZW19XG4gICAgICAgICAgICAgICAgICAgIHtmaWx0ZXJUZXh0fVxuICAgICAgICAgICAgICAgICAgICB7Z2V0T3B0aW9uTGFiZWx9XG4gICAgICAgICAgICAgICAgICAgIGlzRmlyc3Q9e2lzSXRlbUZpcnN0KGkpfVxuICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZT17aXNJdGVtQWN0aXZlKFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uSWRlbnRpZmllclxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICBpc0hvdmVyPXtpc0l0ZW1Ib3Zlcihob3Zlckl0ZW1JbmRleCwgaXRlbSwgaSwgaXRlbXMpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zdmVsdGU6Y29tcG9uZW50PlxuICAgIDwvZGl2Plxuey9pZn1cblxueyNpZiAhaXNWaXJ0dWFsTGlzdH1cbiAgICA8ZGl2IGNsYXNzPVwibGlzdENvbnRhaW5lclwiIGJpbmQ6dGhpcz17Y29udGFpbmVyfT5cbiAgICAgICAgeyNlYWNoIGl0ZW1zIGFzIGl0ZW0sIGl9XG4gICAgICAgICAgICB7I2lmIGl0ZW0uaXNHcm91cEhlYWRlciAmJiAhaXRlbS5pc1NlbGVjdGFibGV9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3RHcm91cFRpdGxlXCI+e2dldEdyb3VwSGVhZGVyTGFiZWwoaXRlbSl9PC9kaXY+XG4gICAgICAgICAgICB7OmVsc2V9XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBvbjptb3VzZW92ZXI9eygpID0+IGhhbmRsZUhvdmVyKGkpfVxuICAgICAgICAgICAgICAgICAgICBvbjpjbGljaz17KGV2ZW50KSA9PiBoYW5kbGVDbGljayh7IGl0ZW0sIGksIGV2ZW50IH0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImxpc3RJdGVtXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzdmVsdGU6Y29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzPXtJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZmlsdGVyVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRPcHRpb25MYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRmlyc3Q9e2lzSXRlbUZpcnN0KGkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmU9e2lzSXRlbUFjdGl2ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbklkZW50aWZpZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0hvdmVyPXtpc0l0ZW1Ib3Zlcihob3Zlckl0ZW1JbmRleCwgaXRlbSwgaSwgaXRlbXMpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgey9pZn1cbiAgICAgICAgezplbHNlfVxuICAgICAgICAgICAgeyNpZiAhaGlkZUVtcHR5U3RhdGV9XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVtcHR5XCI+e25vT3B0aW9uc01lc3NhZ2V9PC9kaXY+XG4gICAgICAgICAgICB7L2lmfVxuICAgICAgICB7L2VhY2h9XG4gICAgPC9kaXY+XG57L2lmfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZNSSxjQUFjLGVBQUMsQ0FBQyxBQUNaLFVBQVUsQ0FBRSxJQUFJLFlBQVksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUNqRSxhQUFhLENBQUUsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FDM0MsVUFBVSxDQUFFLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUN2QyxVQUFVLENBQUUsSUFBSSxDQUNoQixVQUFVLENBQUUsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQUFDM0MsQ0FBQyxBQUVELFlBQVksZUFBQyxDQUFDLEFBQ1YsTUFBTSxDQUFFLElBQUksbUJBQW1CLENBQUMsTUFBTSxDQUFDLEFBQzNDLENBQUMsQUFFRCxlQUFlLGVBQUMsQ0FBQyxBQUNiLEtBQUssQ0FBRSxJQUFJLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUN0QyxNQUFNLENBQUUsT0FBTyxDQUNmLFNBQVMsQ0FBRSxJQUFJLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUMxQyxXQUFXLENBQUUsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FDN0MsTUFBTSxDQUFFLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUMzQixXQUFXLENBQUUsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQ2hDLE9BQU8sQ0FBRSxJQUFJLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUN6QyxhQUFhLENBQUUsUUFBUSxDQUN2QixVQUFVLENBQUUsTUFBTSxDQUNsQixXQUFXLENBQUUsTUFBTSxDQUNuQixjQUFjLENBQUUsSUFBSSx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsQUFDN0QsQ0FBQyxBQUVELE1BQU0sZUFBQyxDQUFDLEFBQ0osVUFBVSxDQUFFLElBQUksb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQzdDLE9BQU8sQ0FBRSxJQUFJLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUN4QyxLQUFLLENBQUUsSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQUFDekMsQ0FBQyJ9 */";
	append_dev(document.head, style);
}

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[33] = list[i];
	child_ctx[35] = i;
	return child_ctx;
}

// (241:0) {#if isVirtualList}
function create_if_block_3$1(ctx) {
	let div;
	let switch_instance;
	let current;
	var switch_value = /*VirtualList*/ ctx[2];

	function switch_props(ctx) {
		return {
			props: {
				items: /*items*/ ctx[5],
				itemHeight: /*itemHeight*/ ctx[8],
				$$slots: {
					default: [
						create_default_slot,
						({ item, i }) => ({ 33: item, 35: i }),
						({ item, i }) => [0, (item ? 4 : 0) | (i ? 16 : 0)]
					]
				},
				$$scope: { ctx }
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			attr_dev(div, "class", "listContainer virtualList svelte-1wmovev");
			add_location(div, file$b, 241, 4, 6870);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			/*div_binding*/ ctx[21](div);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty[0] & /*items*/ 32) switch_instance_changes.items = /*items*/ ctx[5];
			if (dirty[0] & /*itemHeight*/ 256) switch_instance_changes.itemHeight = /*itemHeight*/ ctx[8];

			if (dirty[0] & /*Item, filterText, getOptionLabel, value, optionIdentifier, hoverItemIndex, items*/ 9834 | dirty[1] & /*$$scope, item, i*/ 52) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*VirtualList*/ ctx[2])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (switch_instance) destroy_component(switch_instance);
			/*div_binding*/ ctx[21](null);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$1.name,
		type: "if",
		source: "(241:0) {#if isVirtualList}",
		ctx
	});

	return block;
}

// (243:8) <svelte:component             this={VirtualList}             {items}             {itemHeight}             let:item             let:i         >
function create_default_slot(ctx) {
	let div;
	let switch_instance;
	let current;
	let mounted;
	let dispose;
	var switch_value = /*Item*/ ctx[3];

	function switch_props(ctx) {
		return {
			props: {
				item: /*item*/ ctx[33],
				filterText: /*filterText*/ ctx[13],
				getOptionLabel: /*getOptionLabel*/ ctx[6],
				isFirst: isItemFirst(/*i*/ ctx[35]),
				isActive: isItemActive(/*item*/ ctx[33], /*value*/ ctx[9], /*optionIdentifier*/ ctx[10]),
				isHover: isItemHover(/*hoverItemIndex*/ ctx[1], /*item*/ ctx[33], /*i*/ ctx[35], /*items*/ ctx[5])
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	function mouseover_handler() {
		return /*mouseover_handler*/ ctx[19](/*i*/ ctx[35]);
	}

	function click_handler(...args) {
		return /*click_handler*/ ctx[20](/*item*/ ctx[33], /*i*/ ctx[35], ...args);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			attr_dev(div, "class", "listItem");
			add_location(div, file$b, 249, 12, 7095);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(div, "mouseover", mouseover_handler, false, false, false),
					listen_dev(div, "click", click_handler, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const switch_instance_changes = {};
			if (dirty[1] & /*item*/ 4) switch_instance_changes.item = /*item*/ ctx[33];
			if (dirty[0] & /*filterText*/ 8192) switch_instance_changes.filterText = /*filterText*/ ctx[13];
			if (dirty[0] & /*getOptionLabel*/ 64) switch_instance_changes.getOptionLabel = /*getOptionLabel*/ ctx[6];
			if (dirty[1] & /*i*/ 16) switch_instance_changes.isFirst = isItemFirst(/*i*/ ctx[35]);
			if (dirty[0] & /*value, optionIdentifier*/ 1536 | dirty[1] & /*item*/ 4) switch_instance_changes.isActive = isItemActive(/*item*/ ctx[33], /*value*/ ctx[9], /*optionIdentifier*/ ctx[10]);
			if (dirty[0] & /*hoverItemIndex, items*/ 34 | dirty[1] & /*item, i*/ 20) switch_instance_changes.isHover = isItemHover(/*hoverItemIndex*/ ctx[1], /*item*/ ctx[33], /*i*/ ctx[35], /*items*/ ctx[5]);

			if (switch_value !== (switch_value = /*Item*/ ctx[3])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (switch_instance) destroy_component(switch_instance);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(243:8) <svelte:component             this={VirtualList}             {items}             {itemHeight}             let:item             let:i         >",
		ctx
	});

	return block;
}

// (273:0) {#if !isVirtualList}
function create_if_block$2(ctx) {
	let div;
	let current;
	let each_value = /*items*/ ctx[5];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let each_1_else = null;

	if (!each_value.length) {
		each_1_else = create_else_block_1$1(ctx);
	}

	const block = {
		c: function create() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (each_1_else) {
				each_1_else.c();
			}

			attr_dev(div, "class", "listContainer svelte-1wmovev");
			add_location(div, file$b, 273, 4, 7829);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			if (each_1_else) {
				each_1_else.m(div, null);
			}

			/*div_binding_1*/ ctx[24](div);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*getGroupHeaderLabel, items, handleHover, handleClick, Item, filterText, getOptionLabel, value, optionIdentifier, hoverItemIndex, noOptionsMessage, hideEmptyState*/ 65258) {
				each_value = /*items*/ ctx[5];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();

				if (!each_value.length && each_1_else) {
					each_1_else.p(ctx, dirty);
				} else if (!each_value.length) {
					each_1_else = create_else_block_1$1(ctx);
					each_1_else.c();
					each_1_else.m(div, null);
				} else if (each_1_else) {
					each_1_else.d(1);
					each_1_else = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
			if (each_1_else) each_1_else.d();
			/*div_binding_1*/ ctx[24](null);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(273:0) {#if !isVirtualList}",
		ctx
	});

	return block;
}

// (299:8) {:else}
function create_else_block_1$1(ctx) {
	let if_block_anchor;
	let if_block = !/*hideEmptyState*/ ctx[11] && create_if_block_2$1(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (!/*hideEmptyState*/ ctx[11]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_2$1(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1$1.name,
		type: "else",
		source: "(299:8) {:else}",
		ctx
	});

	return block;
}

// (300:12) {#if !hideEmptyState}
function create_if_block_2$1(ctx) {
	let div;
	let t;

	const block = {
		c: function create() {
			div = element("div");
			t = text(/*noOptionsMessage*/ ctx[12]);
			attr_dev(div, "class", "empty svelte-1wmovev");
			add_location(div, file$b, 300, 16, 8904);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*noOptionsMessage*/ 4096) set_data_dev(t, /*noOptionsMessage*/ ctx[12]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(300:12) {#if !hideEmptyState}",
		ctx
	});

	return block;
}

// (278:12) {:else}
function create_else_block$1(ctx) {
	let div;
	let switch_instance;
	let t;
	let current;
	let mounted;
	let dispose;
	var switch_value = /*Item*/ ctx[3];

	function switch_props(ctx) {
		return {
			props: {
				item: /*item*/ ctx[33],
				filterText: /*filterText*/ ctx[13],
				getOptionLabel: /*getOptionLabel*/ ctx[6],
				isFirst: isItemFirst(/*i*/ ctx[35]),
				isActive: isItemActive(/*item*/ ctx[33], /*value*/ ctx[9], /*optionIdentifier*/ ctx[10]),
				isHover: isItemHover(/*hoverItemIndex*/ ctx[1], /*item*/ ctx[33], /*i*/ ctx[35], /*items*/ ctx[5])
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	function mouseover_handler_1() {
		return /*mouseover_handler_1*/ ctx[22](/*i*/ ctx[35]);
	}

	function click_handler_1(...args) {
		return /*click_handler_1*/ ctx[23](/*item*/ ctx[33], /*i*/ ctx[35], ...args);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			t = space();
			attr_dev(div, "class", "listItem");
			add_location(div, file$b, 278, 16, 8085);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			append_dev(div, t);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(div, "mouseover", mouseover_handler_1, false, false, false),
					listen_dev(div, "click", click_handler_1, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const switch_instance_changes = {};
			if (dirty[0] & /*items*/ 32) switch_instance_changes.item = /*item*/ ctx[33];
			if (dirty[0] & /*filterText*/ 8192) switch_instance_changes.filterText = /*filterText*/ ctx[13];
			if (dirty[0] & /*getOptionLabel*/ 64) switch_instance_changes.getOptionLabel = /*getOptionLabel*/ ctx[6];
			if (dirty[0] & /*items, value, optionIdentifier*/ 1568) switch_instance_changes.isActive = isItemActive(/*item*/ ctx[33], /*value*/ ctx[9], /*optionIdentifier*/ ctx[10]);
			if (dirty[0] & /*hoverItemIndex, items*/ 34) switch_instance_changes.isHover = isItemHover(/*hoverItemIndex*/ ctx[1], /*item*/ ctx[33], /*i*/ ctx[35], /*items*/ ctx[5]);

			if (switch_value !== (switch_value = /*Item*/ ctx[3])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, t);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (switch_instance) destroy_component(switch_instance);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(278:12) {:else}",
		ctx
	});

	return block;
}

// (276:12) {#if item.isGroupHeader && !item.isSelectable}
function create_if_block_1$1(ctx) {
	let div;
	let t_value = /*getGroupHeaderLabel*/ ctx[7](/*item*/ ctx[33]) + "";
	let t;

	const block = {
		c: function create() {
			div = element("div");
			t = text(t_value);
			attr_dev(div, "class", "listGroupTitle svelte-1wmovev");
			add_location(div, file$b, 276, 16, 7987);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*getGroupHeaderLabel, items*/ 160 && t_value !== (t_value = /*getGroupHeaderLabel*/ ctx[7](/*item*/ ctx[33]) + "")) set_data_dev(t, t_value);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(276:12) {#if item.isGroupHeader && !item.isSelectable}",
		ctx
	});

	return block;
}

// (275:8) {#each items as item, i}
function create_each_block$2(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_1$1, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*item*/ ctx[33].isGroupHeader && !/*item*/ ctx[33].isSelectable) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$2.name,
		type: "each",
		source: "(275:8) {#each items as item, i}",
		ctx
	});

	return block;
}

function create_fragment$b(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*isVirtualList*/ ctx[4] && create_if_block_3$1(ctx);
	let if_block1 = !/*isVirtualList*/ ctx[4] && create_if_block$2(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = listen_dev(window, "keydown", /*handleKeyDown*/ ctx[16], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*isVirtualList*/ ctx[4]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*isVirtualList*/ 16) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3$1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (!/*isVirtualList*/ ctx[4]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*isVirtualList*/ 16) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function isItemActive(item, value, optionIdentifier) {
	return value && value[optionIdentifier] === item[optionIdentifier];
}

function isItemFirst(itemIndex) {
	return itemIndex === 0;
}

function isItemHover(hoverItemIndex, item, itemIndex, items) {
	return hoverItemIndex === itemIndex || items.length === 1;
}

function instance$b($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("List", slots, []);
	const dispatch = createEventDispatcher();
	let { container = undefined } = $$props;
	let { VirtualList } = $$props;
	let { Item: Item$1 = Item } = $$props;
	let { isVirtualList = false } = $$props;
	let { items = [] } = $$props;

	let { getOptionLabel = (option, filterText) => {
		if (option) return option.isCreator
		? `Create \"${filterText}\"`
		: option.label;
	} } = $$props;

	let { getGroupHeaderLabel = option => {
		return option.label;
	} } = $$props;

	let { itemHeight = 40 } = $$props;
	let { hoverItemIndex = 0 } = $$props;
	let { value = undefined } = $$props;
	let { optionIdentifier = "value" } = $$props;
	let { hideEmptyState = false } = $$props;
	let { noOptionsMessage = "No options" } = $$props;
	let { isMulti = false } = $$props;
	let { activeItemIndex = 0 } = $$props;
	let { filterText = "" } = $$props;
	let isScrollingTimer = 0;
	let isScrolling = false;
	let prev_items;

	onMount(() => {
		if (items.length > 0 && !isMulti && value) {
			const _hoverItemIndex = items.findIndex(item => item[optionIdentifier] === value[optionIdentifier]);

			if (_hoverItemIndex) {
				$$invalidate(1, hoverItemIndex = _hoverItemIndex);
			}
		}

		scrollToActiveItem("active");

		container.addEventListener(
			"scroll",
			() => {
				clearTimeout(isScrollingTimer);

				isScrollingTimer = setTimeout(
					() => {
						isScrolling = false;
					},
					100
				);
			},
			false
		);
	});

	beforeUpdate(() => {
		if (items !== prev_items && items.length > 0) {
			$$invalidate(1, hoverItemIndex = 0);
		}

		prev_items = items;
	});

	function handleSelect(item) {
		if (item.isCreator) return;
		dispatch("itemSelected", item);
	}

	function handleHover(i) {
		if (isScrolling) return;
		$$invalidate(1, hoverItemIndex = i);
	}

	function handleClick(args) {
		const { item, i, event } = args;
		event.stopPropagation();
		if (value && !isMulti && value[optionIdentifier] === item[optionIdentifier]) return closeList();

		if (item.isCreator) {
			dispatch("itemCreated", filterText);
		} else {
			$$invalidate(17, activeItemIndex = i);
			$$invalidate(1, hoverItemIndex = i);
			handleSelect(item);
		}
	}

	function closeList() {
		dispatch("closeList");
	}

	async function updateHoverItem(increment) {
		if (isVirtualList) return;
		let isNonSelectableItem = true;

		while (isNonSelectableItem) {
			if (increment > 0 && hoverItemIndex === items.length - 1) {
				$$invalidate(1, hoverItemIndex = 0);
			} else if (increment < 0 && hoverItemIndex === 0) {
				$$invalidate(1, hoverItemIndex = items.length - 1);
			} else {
				$$invalidate(1, hoverItemIndex = hoverItemIndex + increment);
			}

			isNonSelectableItem = items[hoverItemIndex].isGroupHeader && !items[hoverItemIndex].isSelectable;
		}

		await tick();
		scrollToActiveItem("hover");
	}

	function handleKeyDown(e) {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				items.length && updateHoverItem(1);
				break;
			case "ArrowUp":
				e.preventDefault();
				items.length && updateHoverItem(-1);
				break;
			case "Enter":
				e.preventDefault();
				if (items.length === 0) break;
				const hoverItem = items[hoverItemIndex];
				if (value && !isMulti && value[optionIdentifier] === hoverItem[optionIdentifier]) {
					closeList();
					break;
				}
				if (hoverItem.isCreator) {
					dispatch("itemCreated", filterText);
				} else {
					$$invalidate(17, activeItemIndex = hoverItemIndex);
					handleSelect(items[hoverItemIndex]);
				}
				break;
			case "Tab":
				e.preventDefault();
				if (items.length === 0) break;
				if (value && value[optionIdentifier] === items[hoverItemIndex][optionIdentifier]) return closeList();
				$$invalidate(17, activeItemIndex = hoverItemIndex);
				handleSelect(items[hoverItemIndex]);
				break;
		}
	}

	function scrollToActiveItem(className) {
		if (isVirtualList || !container) return;
		let offsetBounding;
		const focusedElemBounding = container.querySelector(`.listItem .${className}`);

		if (focusedElemBounding) {
			offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
		}

		$$invalidate(0, container.scrollTop -= offsetBounding, container);
	}

	const writable_props = [
		"container",
		"VirtualList",
		"Item",
		"isVirtualList",
		"items",
		"getOptionLabel",
		"getGroupHeaderLabel",
		"itemHeight",
		"hoverItemIndex",
		"value",
		"optionIdentifier",
		"hideEmptyState",
		"noOptionsMessage",
		"isMulti",
		"activeItemIndex",
		"filterText"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<List> was created with unknown prop '${key}'`);
	});

	const mouseover_handler = i => handleHover(i);
	const click_handler = (item, i, event) => handleClick({ item, i, event });

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			container = $$value;
			$$invalidate(0, container);
		});
	}

	const mouseover_handler_1 = i => handleHover(i);
	const click_handler_1 = (item, i, event) => handleClick({ item, i, event });

	function div_binding_1($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			container = $$value;
			$$invalidate(0, container);
		});
	}

	$$self.$$set = $$props => {
		if ("container" in $$props) $$invalidate(0, container = $$props.container);
		if ("VirtualList" in $$props) $$invalidate(2, VirtualList = $$props.VirtualList);
		if ("Item" in $$props) $$invalidate(3, Item$1 = $$props.Item);
		if ("isVirtualList" in $$props) $$invalidate(4, isVirtualList = $$props.isVirtualList);
		if ("items" in $$props) $$invalidate(5, items = $$props.items);
		if ("getOptionLabel" in $$props) $$invalidate(6, getOptionLabel = $$props.getOptionLabel);
		if ("getGroupHeaderLabel" in $$props) $$invalidate(7, getGroupHeaderLabel = $$props.getGroupHeaderLabel);
		if ("itemHeight" in $$props) $$invalidate(8, itemHeight = $$props.itemHeight);
		if ("hoverItemIndex" in $$props) $$invalidate(1, hoverItemIndex = $$props.hoverItemIndex);
		if ("value" in $$props) $$invalidate(9, value = $$props.value);
		if ("optionIdentifier" in $$props) $$invalidate(10, optionIdentifier = $$props.optionIdentifier);
		if ("hideEmptyState" in $$props) $$invalidate(11, hideEmptyState = $$props.hideEmptyState);
		if ("noOptionsMessage" in $$props) $$invalidate(12, noOptionsMessage = $$props.noOptionsMessage);
		if ("isMulti" in $$props) $$invalidate(18, isMulti = $$props.isMulti);
		if ("activeItemIndex" in $$props) $$invalidate(17, activeItemIndex = $$props.activeItemIndex);
		if ("filterText" in $$props) $$invalidate(13, filterText = $$props.filterText);
	};

	$$self.$capture_state = () => ({
		beforeUpdate,
		createEventDispatcher,
		onMount,
		tick,
		ItemComponent: Item,
		dispatch,
		container,
		VirtualList,
		Item: Item$1,
		isVirtualList,
		items,
		getOptionLabel,
		getGroupHeaderLabel,
		itemHeight,
		hoverItemIndex,
		value,
		optionIdentifier,
		hideEmptyState,
		noOptionsMessage,
		isMulti,
		activeItemIndex,
		filterText,
		isScrollingTimer,
		isScrolling,
		prev_items,
		handleSelect,
		handleHover,
		handleClick,
		closeList,
		updateHoverItem,
		handleKeyDown,
		scrollToActiveItem,
		isItemActive,
		isItemFirst,
		isItemHover
	});

	$$self.$inject_state = $$props => {
		if ("container" in $$props) $$invalidate(0, container = $$props.container);
		if ("VirtualList" in $$props) $$invalidate(2, VirtualList = $$props.VirtualList);
		if ("Item" in $$props) $$invalidate(3, Item$1 = $$props.Item);
		if ("isVirtualList" in $$props) $$invalidate(4, isVirtualList = $$props.isVirtualList);
		if ("items" in $$props) $$invalidate(5, items = $$props.items);
		if ("getOptionLabel" in $$props) $$invalidate(6, getOptionLabel = $$props.getOptionLabel);
		if ("getGroupHeaderLabel" in $$props) $$invalidate(7, getGroupHeaderLabel = $$props.getGroupHeaderLabel);
		if ("itemHeight" in $$props) $$invalidate(8, itemHeight = $$props.itemHeight);
		if ("hoverItemIndex" in $$props) $$invalidate(1, hoverItemIndex = $$props.hoverItemIndex);
		if ("value" in $$props) $$invalidate(9, value = $$props.value);
		if ("optionIdentifier" in $$props) $$invalidate(10, optionIdentifier = $$props.optionIdentifier);
		if ("hideEmptyState" in $$props) $$invalidate(11, hideEmptyState = $$props.hideEmptyState);
		if ("noOptionsMessage" in $$props) $$invalidate(12, noOptionsMessage = $$props.noOptionsMessage);
		if ("isMulti" in $$props) $$invalidate(18, isMulti = $$props.isMulti);
		if ("activeItemIndex" in $$props) $$invalidate(17, activeItemIndex = $$props.activeItemIndex);
		if ("filterText" in $$props) $$invalidate(13, filterText = $$props.filterText);
		if ("isScrollingTimer" in $$props) isScrollingTimer = $$props.isScrollingTimer;
		if ("isScrolling" in $$props) isScrolling = $$props.isScrolling;
		if ("prev_items" in $$props) prev_items = $$props.prev_items;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		container,
		hoverItemIndex,
		VirtualList,
		Item$1,
		isVirtualList,
		items,
		getOptionLabel,
		getGroupHeaderLabel,
		itemHeight,
		value,
		optionIdentifier,
		hideEmptyState,
		noOptionsMessage,
		filterText,
		handleHover,
		handleClick,
		handleKeyDown,
		activeItemIndex,
		isMulti,
		mouseover_handler,
		click_handler,
		div_binding,
		mouseover_handler_1,
		click_handler_1,
		div_binding_1
	];
}

class List extends SvelteComponentDev {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-1wmovev-style")) add_css$6();

		init(
			this,
			options,
			instance$b,
			create_fragment$b,
			safe_not_equal,
			{
				container: 0,
				VirtualList: 2,
				Item: 3,
				isVirtualList: 4,
				items: 5,
				getOptionLabel: 6,
				getGroupHeaderLabel: 7,
				itemHeight: 8,
				hoverItemIndex: 1,
				value: 9,
				optionIdentifier: 10,
				hideEmptyState: 11,
				noOptionsMessage: 12,
				isMulti: 18,
				activeItemIndex: 17,
				filterText: 13
			},
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "List",
			options,
			id: create_fragment$b.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*VirtualList*/ ctx[2] === undefined && !("VirtualList" in props)) {
			console.warn("<List> was created without expected prop 'VirtualList'");
		}
	}

	get container() {
		return this.$$.ctx[0];
	}

	set container(container) {
		this.$set({ container });
		flush();
	}

	get VirtualList() {
		return this.$$.ctx[2];
	}

	set VirtualList(VirtualList) {
		this.$set({ VirtualList });
		flush();
	}

	get Item() {
		return this.$$.ctx[3];
	}

	set Item(Item) {
		this.$set({ Item });
		flush();
	}

	get isVirtualList() {
		return this.$$.ctx[4];
	}

	set isVirtualList(isVirtualList) {
		this.$set({ isVirtualList });
		flush();
	}

	get items() {
		return this.$$.ctx[5];
	}

	set items(items) {
		this.$set({ items });
		flush();
	}

	get getOptionLabel() {
		return this.$$.ctx[6];
	}

	set getOptionLabel(getOptionLabel) {
		this.$set({ getOptionLabel });
		flush();
	}

	get getGroupHeaderLabel() {
		return this.$$.ctx[7];
	}

	set getGroupHeaderLabel(getGroupHeaderLabel) {
		this.$set({ getGroupHeaderLabel });
		flush();
	}

	get itemHeight() {
		return this.$$.ctx[8];
	}

	set itemHeight(itemHeight) {
		this.$set({ itemHeight });
		flush();
	}

	get hoverItemIndex() {
		return this.$$.ctx[1];
	}

	set hoverItemIndex(hoverItemIndex) {
		this.$set({ hoverItemIndex });
		flush();
	}

	get value() {
		return this.$$.ctx[9];
	}

	set value(value) {
		this.$set({ value });
		flush();
	}

	get optionIdentifier() {
		return this.$$.ctx[10];
	}

	set optionIdentifier(optionIdentifier) {
		this.$set({ optionIdentifier });
		flush();
	}

	get hideEmptyState() {
		return this.$$.ctx[11];
	}

	set hideEmptyState(hideEmptyState) {
		this.$set({ hideEmptyState });
		flush();
	}

	get noOptionsMessage() {
		return this.$$.ctx[12];
	}

	set noOptionsMessage(noOptionsMessage) {
		this.$set({ noOptionsMessage });
		flush();
	}

	get isMulti() {
		return this.$$.ctx[18];
	}

	set isMulti(isMulti) {
		this.$set({ isMulti });
		flush();
	}

	get activeItemIndex() {
		return this.$$.ctx[17];
	}

	set activeItemIndex(activeItemIndex) {
		this.$set({ activeItemIndex });
		flush();
	}

	get filterText() {
		return this.$$.ctx[13];
	}

	set filterText(filterText) {
		this.$set({ filterText });
		flush();
	}
}

/* src/Selection.svelte generated by Svelte v3.35.0 */

const file$a = "src/Selection.svelte";

function add_css$5() {
	var style = element("style");
	style.id = "svelte-pu1q1n-style";
	style.textContent = ".selection.svelte-pu1q1n{text-overflow:ellipsis;overflow-x:hidden;white-space:nowrap}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0aW9uLnN2ZWx0ZSIsInNvdXJjZXMiOlsiU2VsZWN0aW9uLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuICAgIGV4cG9ydCBsZXQgZ2V0U2VsZWN0aW9uTGFiZWwgPSB1bmRlZmluZWQ7XG4gICAgZXhwb3J0IGxldCBpdGVtID0gdW5kZWZpbmVkO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgICAuc2VsZWN0aW9uIHtcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB9XG48L3N0eWxlPlxuXG48ZGl2IGNsYXNzPVwic2VsZWN0aW9uXCI+XG4gICAge0BodG1sIGdldFNlbGVjdGlvbkxhYmVsKGl0ZW0pfVxuPC9kaXY+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUksVUFBVSxjQUFDLENBQUMsQUFDUixhQUFhLENBQUUsUUFBUSxDQUN2QixVQUFVLENBQUUsTUFBTSxDQUNsQixXQUFXLENBQUUsTUFBTSxBQUN2QixDQUFDIn0= */";
	append_dev(document.head, style);
}

function create_fragment$a(ctx) {
	let div;
	let raw_value = /*getSelectionLabel*/ ctx[0](/*item*/ ctx[1]) + "";

	const block = {
		c: function create() {
			div = element("div");
			attr_dev(div, "class", "selection svelte-pu1q1n");
			add_location(div, file$a, 13, 0, 230);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			div.innerHTML = raw_value;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*getSelectionLabel, item*/ 3 && raw_value !== (raw_value = /*getSelectionLabel*/ ctx[0](/*item*/ ctx[1]) + "")) div.innerHTML = raw_value;		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$a($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Selection", slots, []);
	let { getSelectionLabel = undefined } = $$props;
	let { item = undefined } = $$props;
	const writable_props = ["getSelectionLabel", "item"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Selection> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("getSelectionLabel" in $$props) $$invalidate(0, getSelectionLabel = $$props.getSelectionLabel);
		if ("item" in $$props) $$invalidate(1, item = $$props.item);
	};

	$$self.$capture_state = () => ({ getSelectionLabel, item });

	$$self.$inject_state = $$props => {
		if ("getSelectionLabel" in $$props) $$invalidate(0, getSelectionLabel = $$props.getSelectionLabel);
		if ("item" in $$props) $$invalidate(1, item = $$props.item);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [getSelectionLabel, item];
}

class Selection extends SvelteComponentDev {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-pu1q1n-style")) add_css$5();
		init(this, options, instance$a, create_fragment$a, safe_not_equal, { getSelectionLabel: 0, item: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Selection",
			options,
			id: create_fragment$a.name
		});
	}

	get getSelectionLabel() {
		return this.$$.ctx[0];
	}

	set getSelectionLabel(getSelectionLabel) {
		this.$set({ getSelectionLabel });
		flush();
	}

	get item() {
		return this.$$.ctx[1];
	}

	set item(item) {
		this.$set({ item });
		flush();
	}
}

/* src/MultiSelection.svelte generated by Svelte v3.35.0 */
const file$9 = "src/MultiSelection.svelte";

function add_css$4() {
	var style = element("style");
	style.id = "svelte-liu9pa-style";
	style.textContent = ".multiSelectItem.svelte-liu9pa.svelte-liu9pa{background:var(--multiItemBG, #ebedef);margin:var(--multiItemMargin, 5px 5px 0 0);border-radius:var(--multiItemBorderRadius, 16px);height:var(--multiItemHeight, 32px);line-height:var(--multiItemHeight, 32px);display:flex;cursor:default;padding:var(--multiItemPadding, 0 10px 0 15px);max-width:100%}.multiSelectItem_label.svelte-liu9pa.svelte-liu9pa{margin:var(--multiLabelMargin, 0 5px 0 0);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.multiSelectItem.svelte-liu9pa.svelte-liu9pa:hover,.multiSelectItem.active.svelte-liu9pa.svelte-liu9pa{background-color:var(--multiItemActiveBG, #006fff);color:var(--multiItemActiveColor, #fff)}.multiSelectItem.disabled.svelte-liu9pa.svelte-liu9pa:hover{background:var(--multiItemDisabledHoverBg, #ebedef);color:var(--multiItemDisabledHoverColor, #c1c6cc)}.multiSelectItem_clear.svelte-liu9pa.svelte-liu9pa{border-radius:var(--multiClearRadius, 50%);background:var(--multiClearBG, #52616f);min-width:var(--multiClearWidth, 16px);max-width:var(--multiClearWidth, 16px);height:var(--multiClearHeight, 16px);position:relative;top:var(--multiClearTop, 8px);text-align:var(--multiClearTextAlign, center);padding:var(--multiClearPadding, 1px)}.multiSelectItem_clear.svelte-liu9pa.svelte-liu9pa:hover,.active.svelte-liu9pa .multiSelectItem_clear.svelte-liu9pa{background:var(--multiClearHoverBG, #fff)}.multiSelectItem_clear.svelte-liu9pa:hover svg.svelte-liu9pa,.active.svelte-liu9pa .multiSelectItem_clear svg.svelte-liu9pa{fill:var(--multiClearHoverFill, #006fff)}.multiSelectItem_clear.svelte-liu9pa svg.svelte-liu9pa{fill:var(--multiClearFill, #ebedef);vertical-align:top}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlTZWxlY3Rpb24uc3ZlbHRlIiwic291cmNlcyI6WyJNdWx0aVNlbGVjdGlvbi5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgICBpbXBvcnQgeyBjcmVhdGVFdmVudERpc3BhdGNoZXIgfSBmcm9tICdzdmVsdGUnO1xuXG4gICAgY29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXIoKTtcblxuICAgIGV4cG9ydCBsZXQgdmFsdWUgPSBbXTtcbiAgICBleHBvcnQgbGV0IGFjdGl2ZXZhbHVlID0gdW5kZWZpbmVkO1xuICAgIGV4cG9ydCBsZXQgaXNEaXNhYmxlZCA9IGZhbHNlO1xuICAgIGV4cG9ydCBsZXQgbXVsdGlGdWxsSXRlbUNsZWFyYWJsZSA9IGZhbHNlO1xuICAgIGV4cG9ydCBsZXQgZ2V0U2VsZWN0aW9uTGFiZWwgPSB1bmRlZmluZWQ7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVDbGVhcihpLCBldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZGlzcGF0Y2goJ211bHRpSXRlbUNsZWFyJywgeyBpIH0pO1xuICAgIH1cbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gICAgLm11bHRpU2VsZWN0SXRlbSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLW11bHRpSXRlbUJHLCAjZWJlZGVmKTtcbiAgICAgICAgbWFyZ2luOiB2YXIoLS1tdWx0aUl0ZW1NYXJnaW4sIDVweCA1cHggMCAwKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogdmFyKC0tbXVsdGlJdGVtQm9yZGVyUmFkaXVzLCAxNnB4KTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1tdWx0aUl0ZW1IZWlnaHQsIDMycHgpO1xuICAgICAgICBsaW5lLWhlaWdodDogdmFyKC0tbXVsdGlJdGVtSGVpZ2h0LCAzMnB4KTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgICAgICBwYWRkaW5nOiB2YXIoLS1tdWx0aUl0ZW1QYWRkaW5nLCAwIDEwcHggMCAxNXB4KTtcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgIH1cblxuICAgIC5tdWx0aVNlbGVjdEl0ZW1fbGFiZWwge1xuICAgICAgICBtYXJnaW46IHZhcigtLW11bHRpTGFiZWxNYXJnaW4sIDAgNXB4IDAgMCk7XG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIH1cblxuICAgIC5tdWx0aVNlbGVjdEl0ZW06aG92ZXIsXG4gICAgLm11bHRpU2VsZWN0SXRlbS5hY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tdWx0aUl0ZW1BY3RpdmVCRywgIzAwNmZmZik7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tdWx0aUl0ZW1BY3RpdmVDb2xvciwgI2ZmZik7XG4gICAgfVxuXG4gICAgLm11bHRpU2VsZWN0SXRlbS5kaXNhYmxlZDpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLW11bHRpSXRlbURpc2FibGVkSG92ZXJCZywgI2ViZWRlZik7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1tdWx0aUl0ZW1EaXNhYmxlZEhvdmVyQ29sb3IsICNjMWM2Y2MpO1xuICAgIH1cblxuICAgIC5tdWx0aVNlbGVjdEl0ZW1fY2xlYXIge1xuICAgICAgICBib3JkZXItcmFkaXVzOiB2YXIoLS1tdWx0aUNsZWFyUmFkaXVzLCA1MCUpO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1tdWx0aUNsZWFyQkcsICM1MjYxNmYpO1xuICAgICAgICBtaW4td2lkdGg6IHZhcigtLW11bHRpQ2xlYXJXaWR0aCwgMTZweCk7XG4gICAgICAgIG1heC13aWR0aDogdmFyKC0tbXVsdGlDbGVhcldpZHRoLCAxNnB4KTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1tdWx0aUNsZWFySGVpZ2h0LCAxNnB4KTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB0b3A6IHZhcigtLW11bHRpQ2xlYXJUb3AsIDhweCk7XG4gICAgICAgIHRleHQtYWxpZ246IHZhcigtLW11bHRpQ2xlYXJUZXh0QWxpZ24sIGNlbnRlcik7XG4gICAgICAgIHBhZGRpbmc6IHZhcigtLW11bHRpQ2xlYXJQYWRkaW5nLCAxcHgpO1xuICAgIH1cblxuICAgIC5tdWx0aVNlbGVjdEl0ZW1fY2xlYXI6aG92ZXIsXG4gICAgLmFjdGl2ZSAubXVsdGlTZWxlY3RJdGVtX2NsZWFyIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tbXVsdGlDbGVhckhvdmVyQkcsICNmZmYpO1xuICAgIH1cblxuICAgIC5tdWx0aVNlbGVjdEl0ZW1fY2xlYXI6aG92ZXIgc3ZnLFxuICAgIC5hY3RpdmUgLm11bHRpU2VsZWN0SXRlbV9jbGVhciBzdmcge1xuICAgICAgICBmaWxsOiB2YXIoLS1tdWx0aUNsZWFySG92ZXJGaWxsLCAjMDA2ZmZmKTtcbiAgICB9XG5cbiAgICAubXVsdGlTZWxlY3RJdGVtX2NsZWFyIHN2ZyB7XG4gICAgICAgIGZpbGw6IHZhcigtLW11bHRpQ2xlYXJGaWxsLCAjZWJlZGVmKTtcbiAgICAgICAgdmVydGljYWwtYWxpZ246IHRvcDtcbiAgICB9XG48L3N0eWxlPlxuXG57I2VhY2ggdmFsdWUgYXMgdmFsdWUsIGl9XG4gICAgPGRpdlxuICAgICAgICBjbGFzcz1cIm11bHRpU2VsZWN0SXRlbSB7YWN0aXZldmFsdWUgPT09IGlcbiAgICAgICAgICAgID8gJ2FjdGl2ZSdcbiAgICAgICAgICAgIDogJyd9IHtpc0Rpc2FibGVkID8gJ2Rpc2FibGVkJyA6ICcnfVwiXG4gICAgICAgIG9uOmNsaWNrPXsoZXZlbnQpID0+XG4gICAgICAgICAgICBtdWx0aUZ1bGxJdGVtQ2xlYXJhYmxlID8gaGFuZGxlQ2xlYXIoaSwgZXZlbnQpIDoge319XG4gICAgPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibXVsdGlTZWxlY3RJdGVtX2xhYmVsXCI+XG4gICAgICAgICAgICB7QGh0bWwgZ2V0U2VsZWN0aW9uTGFiZWwodmFsdWUpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgeyNpZiAhaXNEaXNhYmxlZCAmJiAhbXVsdGlGdWxsSXRlbUNsZWFyYWJsZX1cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm11bHRpU2VsZWN0SXRlbV9jbGVhclwiXG4gICAgICAgICAgICAgICAgb246Y2xpY2s9eyhldmVudCkgPT4gaGFuZGxlQ2xlYXIoaSwgZXZlbnQpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgICAgICAgICAgICAgICAgIHZpZXdCb3g9XCItMiAtMiA1MCA1MFwiXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0zNC45MjMsMzcuMjUxTDI0LDI2LjMyOEwxMy4wNzcsMzcuMjUxTDkuNDM2LDMzLjYxbDEwLjkyMy0xMC45MjNMOS40MzYsMTEuNzY1bDMuNjQxLTMuNjQxTDI0LDE5LjA0N0wzNC45MjMsOC4xMjQgbDMuNjQxLDMuNjQxTDI3LjY0MSwyMi42ODhMMzguNTY0LDMzLjYxTDM0LjkyMywzNy4yNTF6XCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB7L2lmfVxuICAgIDwvZGl2Plxuey9lYWNofVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCSSxnQkFBZ0IsNEJBQUMsQ0FBQyxBQUNkLFVBQVUsQ0FBRSxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FDdkMsTUFBTSxDQUFFLElBQUksaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQzNDLGFBQWEsQ0FBRSxJQUFJLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUNqRCxNQUFNLENBQUUsSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FDcEMsV0FBVyxDQUFFLElBQUksaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQ3pDLE9BQU8sQ0FBRSxJQUFJLENBQ2IsTUFBTSxDQUFFLE9BQU8sQ0FDZixPQUFPLENBQUUsSUFBSSxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FDL0MsU0FBUyxDQUFFLElBQUksQUFDbkIsQ0FBQyxBQUVELHNCQUFzQiw0QkFBQyxDQUFDLEFBQ3BCLE1BQU0sQ0FBRSxJQUFJLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUMxQyxRQUFRLENBQUUsTUFBTSxDQUNoQixhQUFhLENBQUUsUUFBUSxDQUN2QixXQUFXLENBQUUsTUFBTSxBQUN2QixDQUFDLEFBRUQsNENBQWdCLE1BQU0sQ0FDdEIsZ0JBQWdCLE9BQU8sNEJBQUMsQ0FBQyxBQUNyQixnQkFBZ0IsQ0FBRSxJQUFJLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUNuRCxLQUFLLENBQUUsSUFBSSxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQUFDNUMsQ0FBQyxBQUVELGdCQUFnQixxQ0FBUyxNQUFNLEFBQUMsQ0FBQyxBQUM3QixVQUFVLENBQUUsSUFBSSwwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FDcEQsS0FBSyxDQUFFLElBQUksNkJBQTZCLENBQUMsUUFBUSxDQUFDLEFBQ3RELENBQUMsQUFFRCxzQkFBc0IsNEJBQUMsQ0FBQyxBQUNwQixhQUFhLENBQUUsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FDM0MsVUFBVSxDQUFFLElBQUksY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUN4QyxTQUFTLENBQUUsSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FDdkMsU0FBUyxDQUFFLElBQUksaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQ3ZDLE1BQU0sQ0FBRSxJQUFJLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUNyQyxRQUFRLENBQUUsUUFBUSxDQUNsQixHQUFHLENBQUUsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQzlCLFVBQVUsQ0FBRSxJQUFJLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUM5QyxPQUFPLENBQUUsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQUFDMUMsQ0FBQyxBQUVELGtEQUFzQixNQUFNLENBQzVCLHFCQUFPLENBQUMsc0JBQXNCLGNBQUMsQ0FBQyxBQUM1QixVQUFVLENBQUUsSUFBSSxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQUFDOUMsQ0FBQyxBQUVELG9DQUFzQixNQUFNLENBQUMsaUJBQUcsQ0FDaEMscUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLGNBQUMsQ0FBQyxBQUNoQyxJQUFJLENBQUUsSUFBSSxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQUFDN0MsQ0FBQyxBQUVELG9DQUFzQixDQUFDLEdBQUcsY0FBQyxDQUFDLEFBQ3hCLElBQUksQ0FBRSxJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUNwQyxjQUFjLENBQUUsR0FBRyxBQUN2QixDQUFDIn0= */";
	append_dev(document.head, style);
}

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	child_ctx[10] = i;
	return child_ctx;
}

// (88:8) {#if !isDisabled && !multiFullItemClearable}
function create_if_block$1(ctx) {
	let div;
	let svg;
	let path;
	let mounted;
	let dispose;

	function click_handler(...args) {
		return /*click_handler*/ ctx[6](/*i*/ ctx[10], ...args);
	}

	const block = {
		c: function create() {
			div = element("div");
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "d", "M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z");
			add_location(path, file$9, 99, 20, 3025);
			attr_dev(svg, "width", "100%");
			attr_dev(svg, "height", "100%");
			attr_dev(svg, "viewBox", "-2 -2 50 50");
			attr_dev(svg, "focusable", "false");
			attr_dev(svg, "role", "presentation");
			attr_dev(svg, "class", "svelte-liu9pa");
			add_location(svg, file$9, 92, 16, 2795);
			attr_dev(div, "class", "multiSelectItem_clear svelte-liu9pa");
			add_location(div, file$9, 88, 12, 2654);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, svg);
			append_dev(svg, path);

			if (!mounted) {
				dispose = listen_dev(div, "click", click_handler, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(88:8) {#if !isDisabled && !multiFullItemClearable}",
		ctx
	});

	return block;
}

// (77:0) {#each value as value, i}
function create_each_block$1(ctx) {
	let div1;
	let div0;
	let raw_value = /*getSelectionLabel*/ ctx[3](/*value*/ ctx[4]) + "";
	let t0;
	let t1;
	let div1_class_value;
	let mounted;
	let dispose;
	let if_block = !/*isDisabled*/ ctx[1] && !/*multiFullItemClearable*/ ctx[2] && create_if_block$1(ctx);

	function click_handler_1(...args) {
		return /*click_handler_1*/ ctx[7](/*i*/ ctx[10], ...args);
	}

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			t0 = space();
			if (if_block) if_block.c();
			t1 = space();
			attr_dev(div0, "class", "multiSelectItem_label svelte-liu9pa");
			add_location(div0, file$9, 84, 8, 2493);
			attr_dev(div1, "class", div1_class_value = "multiSelectItem " + (/*activevalue*/ ctx[0] === /*i*/ ctx[10] ? "active" : "") + " " + (/*isDisabled*/ ctx[1] ? "disabled" : "") + " svelte-liu9pa");
			add_location(div1, file$9, 77, 4, 2257);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			div0.innerHTML = raw_value;
			append_dev(div1, t0);
			if (if_block) if_block.m(div1, null);
			append_dev(div1, t1);

			if (!mounted) {
				dispose = listen_dev(div1, "click", click_handler_1, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*getSelectionLabel, value*/ 24 && raw_value !== (raw_value = /*getSelectionLabel*/ ctx[3](/*value*/ ctx[4]) + "")) div0.innerHTML = raw_value;
			if (!/*isDisabled*/ ctx[1] && !/*multiFullItemClearable*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					if_block.m(div1, t1);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*activevalue, isDisabled*/ 3 && div1_class_value !== (div1_class_value = "multiSelectItem " + (/*activevalue*/ ctx[0] === /*i*/ ctx[10] ? "active" : "") + " " + (/*isDisabled*/ ctx[1] ? "disabled" : "") + " svelte-liu9pa")) {
				attr_dev(div1, "class", div1_class_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(77:0) {#each value as value, i}",
		ctx
	});

	return block;
}

function create_fragment$9(ctx) {
	let each_1_anchor;
	let each_value = /*value*/ ctx[4];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*activevalue, isDisabled, multiFullItemClearable, handleClear, getSelectionLabel, value*/ 63) {
				each_value = /*value*/ ctx[4];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$9.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$9($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("MultiSelection", slots, []);
	const dispatch = createEventDispatcher();
	let { value = [] } = $$props;
	let { activevalue = undefined } = $$props;
	let { isDisabled = false } = $$props;
	let { multiFullItemClearable = false } = $$props;
	let { getSelectionLabel = undefined } = $$props;

	function handleClear(i, event) {
		event.stopPropagation();
		dispatch("multiItemClear", { i });
	}

	const writable_props = [
		"value",
		"activevalue",
		"isDisabled",
		"multiFullItemClearable",
		"getSelectionLabel"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MultiSelection> was created with unknown prop '${key}'`);
	});

	const click_handler = (i, event) => handleClear(i, event);
	const click_handler_1 = (i, event) => multiFullItemClearable ? handleClear(i, event) : {};

	$$self.$$set = $$props => {
		if ("value" in $$props) $$invalidate(4, value = $$props.value);
		if ("activevalue" in $$props) $$invalidate(0, activevalue = $$props.activevalue);
		if ("isDisabled" in $$props) $$invalidate(1, isDisabled = $$props.isDisabled);
		if ("multiFullItemClearable" in $$props) $$invalidate(2, multiFullItemClearable = $$props.multiFullItemClearable);
		if ("getSelectionLabel" in $$props) $$invalidate(3, getSelectionLabel = $$props.getSelectionLabel);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		dispatch,
		value,
		activevalue,
		isDisabled,
		multiFullItemClearable,
		getSelectionLabel,
		handleClear
	});

	$$self.$inject_state = $$props => {
		if ("value" in $$props) $$invalidate(4, value = $$props.value);
		if ("activevalue" in $$props) $$invalidate(0, activevalue = $$props.activevalue);
		if ("isDisabled" in $$props) $$invalidate(1, isDisabled = $$props.isDisabled);
		if ("multiFullItemClearable" in $$props) $$invalidate(2, multiFullItemClearable = $$props.multiFullItemClearable);
		if ("getSelectionLabel" in $$props) $$invalidate(3, getSelectionLabel = $$props.getSelectionLabel);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		activevalue,
		isDisabled,
		multiFullItemClearable,
		getSelectionLabel,
		value,
		handleClear,
		click_handler,
		click_handler_1
	];
}

class MultiSelection extends SvelteComponentDev {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-liu9pa-style")) add_css$4();

		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
			value: 4,
			activevalue: 0,
			isDisabled: 1,
			multiFullItemClearable: 2,
			getSelectionLabel: 3
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MultiSelection",
			options,
			id: create_fragment$9.name
		});
	}

	get value() {
		return this.$$.ctx[4];
	}

	set value(value) {
		this.$set({ value });
		flush();
	}

	get activevalue() {
		return this.$$.ctx[0];
	}

	set activevalue(activevalue) {
		this.$set({ activevalue });
		flush();
	}

	get isDisabled() {
		return this.$$.ctx[1];
	}

	set isDisabled(isDisabled) {
		this.$set({ isDisabled });
		flush();
	}

	get multiFullItemClearable() {
		return this.$$.ctx[2];
	}

	set multiFullItemClearable(multiFullItemClearable) {
		this.$set({ multiFullItemClearable });
		flush();
	}

	get getSelectionLabel() {
		return this.$$.ctx[3];
	}

	set getSelectionLabel(getSelectionLabel) {
		this.$set({ getSelectionLabel });
		flush();
	}
}

function isOutOfViewport (elem) {
    const bounding = elem.getBoundingClientRect();
    const out = {};

    out.top = bounding.top < 0;
    out.left = bounding.left < 0;
    out.bottom =
        bounding.bottom >
        (window.innerHeight || document.documentElement.clientHeight);
    out.right =
        bounding.right >
        (window.innerWidth || document.documentElement.clientWidth);
    out.any = out.top || out.left || out.bottom || out.right;

    return out;
}

function debounce(func, wait, immediate) {
    let timeout;

    return function executedFunction() {
        let context = this;
        let args = arguments;

        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        let callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}

/* src/ClearIcon.svelte generated by Svelte v3.35.0 */

const file$8 = "src/ClearIcon.svelte";

function create_fragment$8(ctx) {
	let svg;
	let path;

	const block = {
		c: function create() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "fill", "currentColor");
			attr_dev(path, "d", "M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124\n    l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z");
			add_location(path, file$8, 7, 4, 118);
			attr_dev(svg, "width", "100%");
			attr_dev(svg, "height", "100%");
			attr_dev(svg, "viewBox", "-2 -2 50 50");
			attr_dev(svg, "focusable", "false");
			attr_dev(svg, "role", "presentation");
			add_location(svg, file$8, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, path);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$8.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$8($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ClearIcon", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ClearIcon> was created with unknown prop '${key}'`);
	});

	return [];
}

class ClearIcon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ClearIcon",
			options,
			id: create_fragment$8.name
		});
	}
}

/* src/Select.svelte generated by Svelte v3.35.0 */

const { Object: Object_1, console: console_1, document: document_1 } = globals;
const file$7 = "src/Select.svelte";

function add_css$3() {
	var style = element("style");
	style.id = "svelte-1ri8kk0-style";
	style.textContent = ".selectContainer.svelte-1ri8kk0.svelte-1ri8kk0{--padding:0 16px;border:var(--border, 1px solid #d8dbdf);border-radius:var(--borderRadius, 3px);height:var(--height, 42px);position:relative;display:flex;align-items:center;padding:var(--padding);background:var(--background, #fff);margin:var(--margin, 0)}.selectContainer.svelte-1ri8kk0 input.svelte-1ri8kk0{cursor:default;border:none;color:var(--inputColor, #3f4f5f);height:var(--height, 42px);line-height:var(--height, 42px);padding:var(--inputPadding, var(--padding));width:100%;background:transparent;font-size:var(--inputFontSize, 14px);letter-spacing:var(--inputLetterSpacing, -0.08px);position:absolute;left:var(--inputLeft, 0);margin:var(--inputMargin, 0)}.selectContainer.svelte-1ri8kk0 input.svelte-1ri8kk0::placeholder{color:var(--placeholderColor, #78848f);opacity:var(--placeholderOpacity, 1)}.selectContainer.svelte-1ri8kk0 input.svelte-1ri8kk0:focus{outline:none}.selectContainer.svelte-1ri8kk0.svelte-1ri8kk0:hover{border-color:var(--borderHoverColor, #b2b8bf)}.selectContainer.focused.svelte-1ri8kk0.svelte-1ri8kk0{border-color:var(--borderFocusColor, #006fe8)}.selectContainer.disabled.svelte-1ri8kk0.svelte-1ri8kk0{background:var(--disabledBackground, #ebedef);border-color:var(--disabledBorderColor, #ebedef);color:var(--disabledColor, #c1c6cc)}.selectContainer.disabled.svelte-1ri8kk0 input.svelte-1ri8kk0::placeholder{color:var(--disabledPlaceholderColor, #c1c6cc);opacity:var(--disabledPlaceholderOpacity, 1)}.selectedItem.svelte-1ri8kk0.svelte-1ri8kk0{line-height:var(--height, 42px);height:var(--height, 42px);overflow-x:hidden;padding:var(--selectedItemPadding, 0 20px 0 0)}.selectedItem.svelte-1ri8kk0.svelte-1ri8kk0:focus{outline:none}.clearSelect.svelte-1ri8kk0.svelte-1ri8kk0{position:absolute;right:var(--clearSelectRight, 10px);top:var(--clearSelectTop, 11px);bottom:var(--clearSelectBottom, 11px);width:var(--clearSelectWidth, 20px);color:var(--clearSelectColor, #c5cacf);flex:none !important}.clearSelect.svelte-1ri8kk0.svelte-1ri8kk0:hover{color:var(--clearSelectHoverColor, #2c3e50)}.selectContainer.focused.svelte-1ri8kk0 .clearSelect.svelte-1ri8kk0{color:var(--clearSelectFocusColor, #3f4f5f)}.indicator.svelte-1ri8kk0.svelte-1ri8kk0{position:absolute;right:var(--indicatorRight, 10px);top:var(--indicatorTop, 11px);width:var(--indicatorWidth, 20px);height:var(--indicatorHeight, 20px);color:var(--indicatorColor, #c5cacf)}.indicator.svelte-1ri8kk0 svg.svelte-1ri8kk0{display:inline-block;fill:var(--indicatorFill, currentcolor);line-height:1;stroke:var(--indicatorStroke, currentcolor);stroke-width:0}.spinner.svelte-1ri8kk0.svelte-1ri8kk0{position:absolute;right:var(--spinnerRight, 10px);top:var(--spinnerLeft, 11px);width:var(--spinnerWidth, 20px);height:var(--spinnerHeight, 20px);color:var(--spinnerColor, #51ce6c);animation:svelte-1ri8kk0-rotate 0.75s linear infinite}.spinner_icon.svelte-1ri8kk0.svelte-1ri8kk0{display:block;height:100%;transform-origin:center center;width:100%;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;-webkit-transform:none}.spinner_path.svelte-1ri8kk0.svelte-1ri8kk0{stroke-dasharray:90;stroke-linecap:round}.multiSelect.svelte-1ri8kk0.svelte-1ri8kk0{display:flex;padding:var(--multiSelectPadding, 0 35px 0 16px);height:auto;flex-wrap:wrap;align-items:stretch}.multiSelect.svelte-1ri8kk0>.svelte-1ri8kk0{flex:1 1 50px}.selectContainer.multiSelect.svelte-1ri8kk0 input.svelte-1ri8kk0{padding:var(--multiSelectInputPadding, 0);position:relative;margin:var(--multiSelectInputMargin, 0)}.hasError.svelte-1ri8kk0.svelte-1ri8kk0{border:var(--errorBorder, 1px solid #ff2d55);background:var(--errorBackground, #fff)}@keyframes svelte-1ri8kk0-rotate{100%{transform:rotate(360deg)}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0LnN2ZWx0ZSIsInNvdXJjZXMiOlsiU2VsZWN0LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuICAgIGltcG9ydCB7XG4gICAgICAgIGJlZm9yZVVwZGF0ZSxcbiAgICAgICAgY3JlYXRlRXZlbnREaXNwYXRjaGVyLFxuICAgICAgICBvbkRlc3Ryb3ksXG4gICAgICAgIG9uTW91bnQsXG4gICAgICAgIHRpY2ssXG4gICAgfSBmcm9tICdzdmVsdGUnO1xuICAgIGltcG9ydCBMaXN0IGZyb20gJy4vTGlzdC5zdmVsdGUnO1xuICAgIGltcG9ydCBJdGVtQ29tcG9uZW50IGZyb20gJy4vSXRlbS5zdmVsdGUnO1xuICAgIGltcG9ydCBTZWxlY3Rpb25Db21wb25lbnQgZnJvbSAnLi9TZWxlY3Rpb24uc3ZlbHRlJztcbiAgICBpbXBvcnQgTXVsdGlTZWxlY3Rpb25Db21wb25lbnQgZnJvbSAnLi9NdWx0aVNlbGVjdGlvbi5zdmVsdGUnO1xuICAgIGltcG9ydCBpc091dE9mVmlld3BvcnQgZnJvbSAnLi91dGlscy9pc091dE9mVmlld3BvcnQnO1xuICAgIGltcG9ydCBkZWJvdW5jZSBmcm9tICcuL3V0aWxzL2RlYm91bmNlJztcbiAgICBpbXBvcnQgRGVmYXVsdENsZWFySWNvbiBmcm9tICcuL0NsZWFySWNvbi5zdmVsdGUnO1xuXG4gICAgY29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXIoKTtcbiAgICBleHBvcnQgbGV0IGNvbnRhaW5lciA9IHVuZGVmaW5lZDtcbiAgICBleHBvcnQgbGV0IGlucHV0ID0gdW5kZWZpbmVkO1xuICAgIGV4cG9ydCBsZXQgSXRlbSA9IEl0ZW1Db21wb25lbnQ7XG4gICAgZXhwb3J0IGxldCBTZWxlY3Rpb24gPSBTZWxlY3Rpb25Db21wb25lbnQ7XG4gICAgZXhwb3J0IGxldCBNdWx0aVNlbGVjdGlvbiA9IE11bHRpU2VsZWN0aW9uQ29tcG9uZW50O1xuICAgIGV4cG9ydCBsZXQgaXNNdWx0aSA9IGZhbHNlO1xuICAgIGV4cG9ydCBsZXQgbXVsdGlGdWxsSXRlbUNsZWFyYWJsZSA9IGZhbHNlO1xuICAgIGV4cG9ydCBsZXQgaXNEaXNhYmxlZCA9IGZhbHNlO1xuICAgIGV4cG9ydCBsZXQgaXNDcmVhdGFibGUgPSBmYWxzZTtcbiAgICBleHBvcnQgbGV0IGlzRm9jdXNlZCA9IGZhbHNlO1xuICAgIGV4cG9ydCBsZXQgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgZXhwb3J0IGxldCBmaWx0ZXJUZXh0ID0gJyc7XG4gICAgZXhwb3J0IGxldCBwbGFjZWhvbGRlciA9ICdTZWxlY3QuLi4nO1xuICAgIGV4cG9ydCBsZXQgaXRlbXMgPSBbXTtcbiAgICBleHBvcnQgbGV0IGl0ZW1GaWx0ZXIgPSAobGFiZWwsIGZpbHRlclRleHQsIG9wdGlvbikgPT5cbiAgICAgICAgbGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXJUZXh0LnRvTG93ZXJDYXNlKCkpO1xuICAgIGV4cG9ydCBsZXQgZ3JvdXBCeSA9IHVuZGVmaW5lZDtcbiAgICBleHBvcnQgbGV0IGdyb3VwRmlsdGVyID0gKGdyb3VwcykgPT4gZ3JvdXBzO1xuICAgIGV4cG9ydCBsZXQgaXNHcm91cEhlYWRlclNlbGVjdGFibGUgPSBmYWxzZTtcbiAgICBleHBvcnQgbGV0IGdldEdyb3VwSGVhZGVyTGFiZWwgPSAob3B0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcHRpb24ubGFiZWw7XG4gICAgfTtcbiAgICBleHBvcnQgbGV0IGdldE9wdGlvbkxhYmVsID0gKG9wdGlvbiwgZmlsdGVyVGV4dCkgPT4ge1xuICAgICAgICByZXR1cm4gb3B0aW9uLmlzQ3JlYXRvciA/IGBDcmVhdGUgXFxcIiR7ZmlsdGVyVGV4dH1cXFwiYCA6IG9wdGlvbi5sYWJlbDtcbiAgICB9O1xuICAgIGV4cG9ydCBsZXQgb3B0aW9uSWRlbnRpZmllciA9ICd2YWx1ZSc7XG4gICAgZXhwb3J0IGxldCBsb2FkT3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgICBleHBvcnQgbGV0IGhhc0Vycm9yID0gZmFsc2U7XG4gICAgZXhwb3J0IGxldCBjb250YWluZXJTdHlsZXMgPSAnJztcbiAgICBleHBvcnQgbGV0IGdldFNlbGVjdGlvbkxhYmVsID0gKG9wdGlvbikgPT4ge1xuICAgICAgICBpZiAob3B0aW9uKSByZXR1cm4gb3B0aW9uLmxhYmVsO1xuICAgIH07XG5cbiAgICBleHBvcnQgbGV0IGNyZWF0ZUdyb3VwSGVhZGVySXRlbSA9IChncm91cFZhbHVlKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogZ3JvdXBWYWx1ZSxcbiAgICAgICAgICAgIGxhYmVsOiBncm91cFZhbHVlLFxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgbGV0IGNyZWF0ZUl0ZW0gPSAoZmlsdGVyVGV4dCkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IGZpbHRlclRleHQsXG4gICAgICAgICAgICBsYWJlbDogZmlsdGVyVGV4dCxcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGxldCBpc1NlYXJjaGFibGUgPSB0cnVlO1xuICAgIGV4cG9ydCBsZXQgaW5wdXRTdHlsZXMgPSAnJztcbiAgICBleHBvcnQgbGV0IGlzQ2xlYXJhYmxlID0gdHJ1ZTtcbiAgICBleHBvcnQgbGV0IGlzV2FpdGluZyA9IGZhbHNlO1xuICAgIGV4cG9ydCBsZXQgbGlzdFBsYWNlbWVudCA9ICdhdXRvJztcbiAgICBleHBvcnQgbGV0IGxpc3RPcGVuID0gZmFsc2U7XG4gICAgZXhwb3J0IGxldCBsaXN0ID0gdW5kZWZpbmVkO1xuICAgIGV4cG9ydCBsZXQgaXNWaXJ0dWFsTGlzdCA9IGZhbHNlO1xuICAgIGV4cG9ydCBsZXQgbG9hZE9wdGlvbnNJbnRlcnZhbCA9IDMwMDtcbiAgICBleHBvcnQgbGV0IG5vT3B0aW9uc01lc3NhZ2UgPSAnTm8gb3B0aW9ucyc7XG4gICAgZXhwb3J0IGxldCBoaWRlRW1wdHlTdGF0ZSA9IGZhbHNlO1xuICAgIGV4cG9ydCBsZXQgZmlsdGVyZWRJdGVtcyA9IFtdO1xuICAgIGV4cG9ydCBsZXQgaW5wdXRBdHRyaWJ1dGVzID0ge307XG4gICAgZXhwb3J0IGxldCBsaXN0QXV0b1dpZHRoID0gdHJ1ZTtcbiAgICBleHBvcnQgbGV0IGl0ZW1IZWlnaHQgPSA0MDtcbiAgICBleHBvcnQgbGV0IEljb24gPSB1bmRlZmluZWQ7XG4gICAgZXhwb3J0IGxldCBpY29uUHJvcHMgPSB7fTtcbiAgICBleHBvcnQgbGV0IHNob3dDaGV2cm9uID0gZmFsc2U7XG4gICAgZXhwb3J0IGxldCBzaG93SW5kaWNhdG9yID0gZmFsc2U7XG4gICAgZXhwb3J0IGxldCBjb250YWluZXJDbGFzc2VzID0gJyc7XG4gICAgZXhwb3J0IGxldCBpbmRpY2F0b3JTdmcgPSB1bmRlZmluZWQ7XG4gICAgZXhwb3J0IGxldCBDbGVhckljb24gPSBEZWZhdWx0Q2xlYXJJY29uO1xuXG4gICAgbGV0IHRhcmdldDtcbiAgICBsZXQgYWN0aXZldmFsdWU7XG4gICAgbGV0IG9yaWdpbmFsSXRlbXNDbG9uZTtcbiAgICBsZXQgVmlydHVhbExpc3Q7XG4gICAgbGV0IHByZXZfdmFsdWU7XG4gICAgbGV0IHByZXZfZmlsdGVyVGV4dDtcbiAgICBsZXQgcHJldl9pc0ZvY3VzZWQ7XG4gICAgbGV0IHByZXZfZmlsdGVyZWRJdGVtcztcblxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlc2V0RmlsdGVyKCkge1xuICAgICAgICBhd2FpdCB0aWNrKCk7XG4gICAgICAgIGZpbHRlclRleHQgPSAnJztcbiAgICB9XG5cbiAgICBsZXQgZ2V0SXRlbXNIYXNJbnZva2VkID0gZmFsc2U7XG4gICAgY29uc3QgZ2V0SXRlbXMgPSBkZWJvdW5jZShhc3luYyAoKSA9PiB7XG4gICAgICAgIGdldEl0ZW1zSGFzSW52b2tlZCA9IHRydWU7XG4gICAgICAgIGlzV2FpdGluZyA9IHRydWU7XG5cbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IGxvYWRPcHRpb25zKGZpbHRlclRleHQpLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybignc3ZlbHRlLXNlbGVjdCBsb2FkT3B0aW9ucyBlcnJvciA6Pj4gJywgZXJyKTtcbiAgICAgICAgICAgIGRpc3BhdGNoKCdlcnJvcicsIHsgdHlwZTogJ2xvYWRPcHRpb25zJywgZGV0YWlsczogZXJyIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzICYmICFyZXMuY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMgPSBbLi4ucmVzXTtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCgnbG9hZGVkJywgeyBpdGVtcyB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbXMgPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXNXYWl0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpc0ZvY3VzZWQgPSB0cnVlO1xuICAgICAgICAgICAgbGlzdE9wZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSwgbG9hZE9wdGlvbnNJbnRlcnZhbCk7XG5cbiAgICAkOiB1cGRhdGV2YWx1ZURpc3BsYXkoaXRlbXMpO1xuXG4gICAgZnVuY3Rpb24gc2V0dmFsdWUoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHtcbiAgICAgICAgICAgICAgICBbb3B0aW9uSWRlbnRpZmllcl06IHZhbHVlLFxuICAgICAgICAgICAgICAgIGxhYmVsOiB2YWx1ZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBpc011bHRpICYmXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHZhbHVlKSAmJlxuICAgICAgICAgICAgdmFsdWUubGVuZ3RoID4gMFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUubWFwKChpdGVtKSA9PlxuICAgICAgICAgICAgICAgIHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyA/IHsgdmFsdWU6IGl0ZW0sIGxhYmVsOiBpdGVtIH0gOiBpdGVtXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IF9pbnB1dEF0dHJpYnV0ZXM7XG4gICAgZnVuY3Rpb24gYXNzaWduSW5wdXRBdHRyaWJ1dGVzKCkge1xuICAgICAgICBfaW5wdXRBdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6ICdvZmYnLFxuICAgICAgICAgICAgICAgIGF1dG9jb3JyZWN0OiAnb2ZmJyxcbiAgICAgICAgICAgICAgICBzcGVsbGNoZWNrOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbnB1dEF0dHJpYnV0ZXNcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIWlzU2VhcmNoYWJsZSkge1xuICAgICAgICAgICAgX2lucHV0QXR0cmlidXRlcy5yZWFkb25seSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb252ZXJ0U3RyaW5nSXRlbXNUb09iamVjdHMoKSB7XG4gICAgICAgIGl0ZW1zID0gaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbSxcbiAgICAgICAgICAgICAgICBsYWJlbDogaXRlbSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0RmlsdGVyZWRJdGVtcygpIHtcbiAgICAgICAgZmlsdGVyZWRJdGVtcyA9IEpTT04ucGFyc2Uob3JpZ2luYWxJdGVtc0Nsb25lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXJJdGVtKGl0ZW0pIHtcbiAgICAgICAgbGV0IGtlZXBJdGVtID0gdHJ1ZTtcblxuICAgICAgICBpZiAoaXNNdWx0aSAmJiB2YWx1ZSkge1xuICAgICAgICAgICAga2VlcEl0ZW0gPSAhdmFsdWUuc29tZSgoeCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB4W29wdGlvbklkZW50aWZpZXJdID09PSBpdGVtW29wdGlvbklkZW50aWZpZXJdO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWtlZXBJdGVtKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChmaWx0ZXJUZXh0Lmxlbmd0aCA8IDEpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gaXRlbUZpbHRlcihnZXRPcHRpb25MYWJlbChpdGVtLCBmaWx0ZXJUZXh0KSwgZmlsdGVyVGV4dCwgaXRlbSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dXBGaWx0ZXJlZEl0ZW1zKCkge1xuICAgICAgICBmaWx0ZXJlZEl0ZW1zID0gbG9hZE9wdGlvbnNcbiAgICAgICAgICAgID8gZmlsdGVyVGV4dC5sZW5ndGggPT09IDBcbiAgICAgICAgICAgICAgICA/IFtdXG4gICAgICAgICAgICAgICAgOiBpdGVtc1xuICAgICAgICAgICAgOiBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGZpbHRlckl0ZW0oaXRlbSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlckdyb3VwZWRJdGVtcygpIHtcbiAgICAgICAgY29uc3QgZ3JvdXBWYWx1ZXMgPSBbXTtcbiAgICAgICAgY29uc3QgZ3JvdXBzID0ge307XG5cbiAgICAgICAgZmlsdGVyZWRJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBncm91cFZhbHVlID0gZ3JvdXBCeShpdGVtKTtcblxuICAgICAgICAgICAgaWYgKCFncm91cFZhbHVlcy5pbmNsdWRlcyhncm91cFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGdyb3VwVmFsdWVzLnB1c2goZ3JvdXBWYWx1ZSk7XG4gICAgICAgICAgICAgICAgZ3JvdXBzW2dyb3VwVmFsdWVdID0gW107XG5cbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBncm91cHNbZ3JvdXBWYWx1ZV0ucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY3JlYXRlR3JvdXBIZWFkZXJJdGVtKGdyb3VwVmFsdWUsIGl0ZW0pLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGdyb3VwVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNHcm91cEhlYWRlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGFibGU6IGlzR3JvdXBIZWFkZXJTZWxlY3RhYmxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdyb3Vwc1tncm91cFZhbHVlXS5wdXNoKFxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oeyBpc0dyb3VwSXRlbTogISFncm91cFZhbHVlIH0sIGl0ZW0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzb3J0ZWRHcm91cGVkSXRlbXMgPSBbXTtcblxuICAgICAgICBncm91cEZpbHRlcihncm91cFZhbHVlcykuZm9yRWFjaCgoZ3JvdXBWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgc29ydGVkR3JvdXBlZEl0ZW1zLnB1c2goLi4uZ3JvdXBzW2dyb3VwVmFsdWVdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZmlsdGVyZWRJdGVtcyA9IHNvcnRlZEdyb3VwZWRJdGVtcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNwYXRjaFNlbGVjdGVkSXRlbSgpIHtcbiAgICAgICAgaWYgKGlzTXVsdGkpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgIT09XG4gICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkocHJldl92YWx1ZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmIChjaGVja3ZhbHVlRm9yRHVwbGljYXRlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKCdzZWxlY3QnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXByZXZfdmFsdWUgfHxcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHZhbHVlW29wdGlvbklkZW50aWZpZXJdKSAhPT1cbiAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShwcmV2X3ZhbHVlW29wdGlvbklkZW50aWZpZXJdKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGRpc3BhdGNoKCdzZWxlY3QnLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cEZpbHRlclRleHQoKSB7XG4gICAgICAgIGlmIChmaWx0ZXJUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlzRm9jdXNlZCA9IHRydWU7XG4gICAgICAgICAgICBsaXN0T3BlbiA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmIChsb2FkT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGdldEl0ZW1zKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvYWRMaXN0KCk7XG4gICAgICAgICAgICAgICAgbGlzdE9wZW4gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzTXVsdGkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZldmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0TGlzdChbXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdCkge1xuICAgICAgICAgICAgbGlzdC4kc2V0KHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJUZXh0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR1cEZvY3VzKCkge1xuICAgICAgICBpZiAoaXNGb2N1c2VkIHx8IGxpc3RPcGVuKSB7XG4gICAgICAgICAgICBoYW5kbGVGb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzZXRGaWx0ZXIoKTtcbiAgICAgICAgICAgIGlmIChpbnB1dCkgaW5wdXQuYmx1cigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IFZpcnR1YWxMaXN0Q29tcG9uZW50O1xuICAgIGFzeW5jIGZ1bmN0aW9uIHNldHVwVmlydHVhbExpc3QoKSB7XG4gICAgICAgIFZpcnR1YWxMaXN0Q29tcG9uZW50ID0gYXdhaXQgaW1wb3J0KCcuL1ZpcnR1YWxMaXN0LnN2ZWx0ZScpO1xuICAgICAgICBWaXJ0dWFsTGlzdCA9IFZpcnR1YWxMaXN0Q29tcG9uZW50LmRlZmF1bHQ7XG4gICAgfVxuXG4gICAgJDoge1xuICAgICAgICBpZiAodmFsdWUpIHNldHZhbHVlKCk7XG4gICAgfVxuXG4gICAgJDoge1xuICAgICAgICBpZiAobm9PcHRpb25zTWVzc2FnZSAmJiBsaXN0KSBsaXN0LiRzZXQoeyBub09wdGlvbnNNZXNzYWdlIH0pO1xuICAgIH1cblxuICAgICQ6IHtcbiAgICAgICAgaWYgKGlucHV0QXR0cmlidXRlcyB8fCAhaXNTZWFyY2hhYmxlKSBhc3NpZ25JbnB1dEF0dHJpYnV0ZXMoKTtcbiAgICB9XG5cbiAgICAkOiB7XG4gICAgICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGggPiAwICYmIHR5cGVvZiBpdGVtc1swXSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNvbnZlcnRTdHJpbmdJdGVtc1RvT2JqZWN0cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvYWRPcHRpb25zICYmIGZpbHRlclRleHQubGVuZ3RoID09PSAwICYmIG9yaWdpbmFsSXRlbXNDbG9uZSkge1xuICAgICAgICAgICAgcmVzZXRGaWx0ZXJlZEl0ZW1zKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXR1cEZpbHRlcmVkSXRlbXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChncm91cEJ5KSB7XG4gICAgICAgICAgICBmaWx0ZXJHcm91cGVkSXRlbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQ6IHtcbiAgICAgICAgaWYgKGlzTXVsdGkgJiYgdmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY2hlY2t2YWx1ZUZvckR1cGxpY2F0ZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQ6IHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBkaXNwYXRjaFNlbGVjdGVkSXRlbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJDoge1xuICAgICAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgICAgICBpZiAobGlzdE9wZW4pIHtcbiAgICAgICAgICAgICAgICBsb2FkTGlzdCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW1vdmVMaXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkOiB7XG4gICAgICAgIGlmIChpc0ZvY3VzZWQgIT09IHByZXZfaXNGb2N1c2VkKSB7XG4gICAgICAgICAgICBzZXR1cEZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkOiB7XG4gICAgICAgIGlmIChmaWx0ZXJUZXh0ICE9PSBwcmV2X2ZpbHRlclRleHQpIHtcbiAgICAgICAgICAgIHNldHVwRmlsdGVyVGV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dXBGaWx0ZXJlZEl0ZW0oKSB7XG4gICAgICAgIGxldCBfZmlsdGVyZWRJdGVtcyA9IFsuLi5maWx0ZXJlZEl0ZW1zXTtcblxuICAgICAgICBpZiAoaXNDcmVhdGFibGUgJiYgZmlsdGVyVGV4dCkge1xuICAgICAgICAgICAgY29uc3QgaXRlbVRvQ3JlYXRlID0gY3JlYXRlSXRlbShmaWx0ZXJUZXh0KTtcbiAgICAgICAgICAgIGl0ZW1Ub0NyZWF0ZS5pc0NyZWF0b3IgPSB0cnVlO1xuXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0l0ZW1XaXRoRmlsdGVyVmFsdWUgPSBfZmlsdGVyZWRJdGVtcy5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgaXRlbVtvcHRpb25JZGVudGlmaWVyXSA9PT0gaXRlbVRvQ3JlYXRlW29wdGlvbklkZW50aWZpZXJdXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgZXhpc3RpbmdTZWxlY3Rpb25XaXRoRmlsdGVyVmFsdWU7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChpc011bHRpKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nU2VsZWN0aW9uV2l0aEZpbHRlclZhbHVlID0gdmFsdWUuZmluZChcbiAgICAgICAgICAgICAgICAgICAgICAgIChzZWxlY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25bb3B0aW9uSWRlbnRpZmllcl0gPT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1Ub0NyZWF0ZVtvcHRpb25JZGVudGlmaWVyXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVbb3B0aW9uSWRlbnRpZmllcl0gPT09XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1Ub0NyZWF0ZVtvcHRpb25JZGVudGlmaWVyXVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1NlbGVjdGlvbldpdGhGaWx0ZXJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFleGlzdGluZ0l0ZW1XaXRoRmlsdGVyVmFsdWUgJiZcbiAgICAgICAgICAgICAgICAhZXhpc3RpbmdTZWxlY3Rpb25XaXRoRmlsdGVyVmFsdWVcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIF9maWx0ZXJlZEl0ZW1zID0gWy4uLl9maWx0ZXJlZEl0ZW1zLCBpdGVtVG9DcmVhdGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0TGlzdChfZmlsdGVyZWRJdGVtcyk7XG4gICAgfVxuXG4gICAgJDoge1xuICAgICAgICBpZiAocHJldl9maWx0ZXJlZEl0ZW1zICE9PSBmaWx0ZXJlZEl0ZW1zKSB7XG4gICAgICAgICAgICBzZXR1cEZpbHRlcmVkSXRlbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJDogc2hvd1NlbGVjdGVkSXRlbSA9IHZhbHVlICYmIGZpbHRlclRleHQubGVuZ3RoID09PSAwO1xuICAgICQ6IHBsYWNlaG9sZGVyVGV4dCA9IHZhbHVlID8gJycgOiBwbGFjZWhvbGRlcjtcblxuICAgIGJlZm9yZVVwZGF0ZSgoKSA9PiB7XG4gICAgICAgIHByZXZfdmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcHJldl9maWx0ZXJUZXh0ID0gZmlsdGVyVGV4dDtcbiAgICAgICAgcHJldl9pc0ZvY3VzZWQgPSBpc0ZvY3VzZWQ7XG4gICAgICAgIHByZXZfZmlsdGVyZWRJdGVtcyA9IGZpbHRlcmVkSXRlbXM7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjaGVja3ZhbHVlRm9yRHVwbGljYXRlcygpIHtcbiAgICAgICAgbGV0IG5vRHVwbGljYXRlcyA9IHRydWU7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgaWRzID0gW107XG4gICAgICAgICAgICBjb25zdCB1bmlxdWVWYWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgdmFsdWUuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFpZHMuaW5jbHVkZXModmFsW29wdGlvbklkZW50aWZpZXJdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZHMucHVzaCh2YWxbb3B0aW9uSWRlbnRpZmllcl0pO1xuICAgICAgICAgICAgICAgICAgICB1bmlxdWVWYWx1ZXMucHVzaCh2YWwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vRHVwbGljYXRlcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIW5vRHVwbGljYXRlcykgdmFsdWUgPSB1bmlxdWVWYWx1ZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vRHVwbGljYXRlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kSXRlbShzZWxlY3Rpb24pIHtcbiAgICAgICAgbGV0IG1hdGNoVG8gPSBzZWxlY3Rpb25cbiAgICAgICAgICAgID8gc2VsZWN0aW9uW29wdGlvbklkZW50aWZpZXJdXG4gICAgICAgICAgICA6IHZhbHVlW29wdGlvbklkZW50aWZpZXJdO1xuICAgICAgICByZXR1cm4gaXRlbXMuZmluZCgoaXRlbSkgPT4gaXRlbVtvcHRpb25JZGVudGlmaWVyXSA9PT0gbWF0Y2hUbyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRldmFsdWVEaXNwbGF5KGl0ZW1zKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICFpdGVtcyB8fFxuICAgICAgICAgICAgaXRlbXMubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgICBpdGVtcy5zb21lKChpdGVtKSA9PiB0eXBlb2YgaXRlbSAhPT0gJ29iamVjdCcpXG4gICAgICAgIClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXZhbHVlIHx8XG4gICAgICAgICAgICAoaXNNdWx0aVxuICAgICAgICAgICAgICAgID8gdmFsdWUuc29tZShcbiAgICAgICAgICAgICAgICAgICAgICAoc2VsZWN0aW9uKSA9PiAhc2VsZWN0aW9uIHx8ICFzZWxlY3Rpb25bb3B0aW9uSWRlbnRpZmllcl1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6ICF2YWx1ZVtvcHRpb25JZGVudGlmaWVyXSlcbiAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5tYXAoXG4gICAgICAgICAgICAgICAgKHNlbGVjdGlvbikgPT4gZmluZEl0ZW0oc2VsZWN0aW9uKSB8fCBzZWxlY3Rpb25cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGZpbmRJdGVtKCkgfHwgdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBzZXRMaXN0KGl0ZW1zKSB7XG4gICAgICAgIGF3YWl0IHRpY2soKTtcbiAgICAgICAgaWYgKCFsaXN0T3BlbikgcmV0dXJuO1xuICAgICAgICBpZiAobGlzdCkgcmV0dXJuIGxpc3QuJHNldCh7IGl0ZW1zIH0pO1xuICAgICAgICBpZiAobG9hZE9wdGlvbnMgJiYgZ2V0SXRlbXNIYXNJbnZva2VkICYmIGl0ZW1zLmxlbmd0aCA+IDApIGxvYWRMaXN0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlTXVsdGlJdGVtQ2xlYXIoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgeyBkZXRhaWwgfSA9IGV2ZW50O1xuICAgICAgICBjb25zdCBpdGVtVG9SZW1vdmUgPVxuICAgICAgICAgICAgdmFsdWVbZGV0YWlsID8gZGV0YWlsLmkgOiB2YWx1ZS5sZW5ndGggLSAxXTtcblxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0gIT09IGl0ZW1Ub1JlbW92ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlzcGF0Y2goJ2NsZWFyJywgaXRlbVRvUmVtb3ZlKTtcblxuICAgICAgICBnZXRQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldFBvc2l0aW9uKCkge1xuICAgICAgICBhd2FpdCB0aWNrKCk7XG4gICAgICAgIGlmICghdGFyZ2V0IHx8ICFjb250YWluZXIpIHJldHVybjtcbiAgICAgICAgY29uc3QgeyB0b3AsIGhlaWdodCwgd2lkdGggfSA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB0YXJnZXQuc3R5bGVbJ21pbi13aWR0aCddID0gYCR7d2lkdGh9cHhgO1xuICAgICAgICB0YXJnZXQuc3R5bGUud2lkdGggPSBgJHtsaXN0QXV0b1dpZHRoID8gJ2F1dG8nIDogJzEwMCUnfWA7XG4gICAgICAgIHRhcmdldC5zdHlsZS5sZWZ0ID0gJzAnO1xuXG4gICAgICAgIGlmIChsaXN0UGxhY2VtZW50ID09PSAndG9wJykge1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLmJvdHRvbSA9IGAke2hlaWdodCArIDV9cHhgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLnRvcCA9IGAke2hlaWdodCArIDV9cHhgO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0O1xuXG4gICAgICAgIGlmIChsaXN0UGxhY2VtZW50ID09PSAnYXV0bycgJiYgaXNPdXRPZlZpZXdwb3J0KHRhcmdldCkuYm90dG9tKSB7XG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUudG9wID0gYGA7XG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUuYm90dG9tID0gYCR7aGVpZ2h0ICsgNX1weGA7XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXQuc3R5bGUudmlzaWJpbGl0eSA9ICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUtleURvd24oZSkge1xuICAgICAgICBpZiAoIWlzRm9jdXNlZCkgcmV0dXJuO1xuXG4gICAgICAgIHN3aXRjaCAoZS5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGxpc3RPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBhY3RpdmV2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBsaXN0T3BlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgYWN0aXZldmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICAgICAgICAgIGlmICghbGlzdE9wZW4pIGlzRm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQmFja3NwYWNlJzpcbiAgICAgICAgICAgICAgICBpZiAoIWlzTXVsdGkgfHwgZmlsdGVyVGV4dC5sZW5ndGggPiAwKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKGlzTXVsdGkgJiYgdmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVNdWx0aUl0ZW1DbGVhcihcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZXZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGFjdGl2ZXZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB2YWx1ZS5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZXZhbHVlID09PSAwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmV2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmV2YWx1ZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5sZW5ndGggPiBhY3RpdmV2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYWN0aXZldmFsdWUgLSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICBpZiAobGlzdCkgbGlzdC4kc2V0KHsgaG92ZXJJdGVtSW5kZXg6IC0xIH0pO1xuICAgICAgICAgICAgICAgIGlmICghaXNNdWx0aSB8fCBmaWx0ZXJUZXh0Lmxlbmd0aCA+IDApIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmV2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZXZhbHVlID0gdmFsdWUubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5sZW5ndGggPiBhY3RpdmV2YWx1ZSAmJlxuICAgICAgICAgICAgICAgICAgICBhY3RpdmV2YWx1ZSAhPT0gMFxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmV2YWx1ZSAtPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIGlmIChsaXN0KSBsaXN0LiRzZXQoeyBob3Zlckl0ZW1JbmRleDogLTEgfSk7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAhaXNNdWx0aSB8fFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUZXh0Lmxlbmd0aCA+IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZldmFsdWUgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmV2YWx1ZSA9PT0gdmFsdWUubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmV2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGl2ZXZhbHVlIDwgdmFsdWUubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmV2YWx1ZSArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvY3VzKCkge1xuICAgICAgICBpc0ZvY3VzZWQgPSB0cnVlO1xuICAgICAgICBpZiAoaW5wdXQpIGlucHV0LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdCgpIHtcbiAgICAgICAgcmVzZXRGaWx0ZXIoKTtcbiAgICAgICAgYWN0aXZldmFsdWUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKCFsaXN0KSByZXR1cm47XG4gICAgICAgIGxpc3QuJGRlc3Ryb3koKTtcbiAgICAgICAgbGlzdCA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICAgICAgICBpZiAodGFyZ2V0LnBhcmVudE5vZGUpIHRhcmdldC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRhcmdldCk7XG4gICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZDtcblxuICAgICAgICBsaXN0ID0gbGlzdDtcbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVdpbmRvd0NsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGV2ZW50VGFyZ2V0ID1cbiAgICAgICAgICAgIGV2ZW50LnBhdGggJiYgZXZlbnQucGF0aC5sZW5ndGggPiAwID8gZXZlbnQucGF0aFswXSA6IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKGNvbnRhaW5lci5jb250YWlucyhldmVudFRhcmdldCkpIHJldHVybjtcbiAgICAgICAgaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIGxpc3RPcGVuID0gZmFsc2U7XG4gICAgICAgIGFjdGl2ZXZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoaW5wdXQpIGlucHV0LmJsdXIoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVDbGljaygpIHtcbiAgICAgICAgaWYgKGlzRGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgaXNGb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgbGlzdE9wZW4gPSAhbGlzdE9wZW47XG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUNsZWFyKCkge1xuICAgICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgbGlzdE9wZW4gPSBmYWxzZTtcbiAgICAgICAgZGlzcGF0Y2goJ2NsZWFyJywgdmFsdWUpO1xuICAgICAgICBoYW5kbGVGb2N1cygpO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGxvYWRMaXN0KCkge1xuICAgICAgICBhd2FpdCB0aWNrKCk7XG4gICAgICAgIGlmICh0YXJnZXQgJiYgbGlzdCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChpc1ZpcnR1YWxMaXN0ICYmICFWaXJ0dWFsTGlzdENvbXBvbmVudCkgYXdhaXQgc2V0dXBWaXJ0dWFsTGlzdCgpO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgICAgICBJdGVtLFxuICAgICAgICAgICAgZmlsdGVyVGV4dCxcbiAgICAgICAgICAgIG9wdGlvbklkZW50aWZpZXIsXG4gICAgICAgICAgICBub09wdGlvbnNNZXNzYWdlLFxuICAgICAgICAgICAgaGlkZUVtcHR5U3RhdGUsXG4gICAgICAgICAgICBpc1ZpcnR1YWxMaXN0LFxuICAgICAgICAgICAgVmlydHVhbExpc3QsXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGlzTXVsdGksXG4gICAgICAgICAgICBnZXRHcm91cEhlYWRlckxhYmVsLFxuICAgICAgICAgICAgaXRlbXM6IGZpbHRlcmVkSXRlbXMsXG4gICAgICAgICAgICBpdGVtSGVpZ2h0LFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChnZXRPcHRpb25MYWJlbCkge1xuICAgICAgICAgICAgZGF0YS5nZXRPcHRpb25MYWJlbCA9IGdldE9wdGlvbkxhYmVsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldCkgdGFyZ2V0LnJlbW92ZSgpO1xuICAgICAgICB0YXJnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKHRhcmdldC5zdHlsZSwge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAnei1pbmRleCc6IDIsXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGxpc3QpIGxpc3QuJGRlc3Ryb3koKTtcbiAgICAgICAgbGlzdCA9IGxpc3Q7XG5cbiAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICBpZiAoY29udGFpbmVyKSBjb250YWluZXIuYXBwZW5kQ2hpbGQodGFyZ2V0KTtcblxuICAgICAgICBsaXN0ID0gbmV3IExpc3Qoe1xuICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgcHJvcHM6IGRhdGEsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpc3QuJG9uKCdpdGVtU2VsZWN0ZWQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZGV0YWlsIH0gPSBldmVudDtcblxuICAgICAgICAgICAgaWYgKGRldGFpbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LCBkZXRhaWwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLmlzR3JvdXBIZWFkZXIgfHwgaXRlbS5pc1NlbGVjdGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzTXVsdGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHZhbHVlLmNvbmNhdChbaXRlbV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBbaXRlbV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXNldEZpbHRlcigpO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdE9wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZXZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpc3QuJG9uKCdpdGVtQ3JlYXRlZCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBkZXRhaWwgfSA9IGV2ZW50O1xuICAgICAgICAgICAgaWYgKGlzTXVsdGkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlIHx8IFtdO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gWy4uLnZhbHVlLCBjcmVhdGVJdGVtKGRldGFpbCldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGNyZWF0ZUl0ZW0oZGV0YWlsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGlzcGF0Y2goJ2l0ZW1DcmVhdGVkJywgZGV0YWlsKTtcbiAgICAgICAgICAgIGZpbHRlclRleHQgPSAnJztcbiAgICAgICAgICAgIGxpc3RPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICBhY3RpdmV2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJlc2V0RmlsdGVyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpc3QuJG9uKCdjbG9zZUxpc3QnLCAoKSA9PiB7XG4gICAgICAgICAgICBsaXN0T3BlbiA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAobGlzdCA9IGxpc3QpLCAodGFyZ2V0ID0gdGFyZ2V0KTtcbiAgICAgICAgZ2V0UG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICBvbk1vdW50KCgpID0+IHtcbiAgICAgICAgaWYgKGlzRm9jdXNlZCkgaW5wdXQuZm9jdXMoKTtcbiAgICAgICAgaWYgKGxpc3RPcGVuKSBsb2FkTGlzdCgpO1xuXG4gICAgICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBvcmlnaW5hbEl0ZW1zQ2xvbmUgPSBKU09OLnN0cmluZ2lmeShpdGVtcyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIG9uRGVzdHJveSgoKSA9PiB7XG4gICAgICAgIHJlbW92ZUxpc3QoKTtcbiAgICB9KTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gICAgLnNlbGVjdENvbnRhaW5lciB7XG4gICAgICAgIC0tcGFkZGluZzogMCAxNnB4O1xuXG4gICAgICAgIGJvcmRlcjogdmFyKC0tYm9yZGVyLCAxcHggc29saWQgI2Q4ZGJkZik7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLWJvcmRlclJhZGl1cywgM3B4KTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1oZWlnaHQsIDQycHgpO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIHBhZGRpbmc6IHZhcigtLXBhZGRpbmcpO1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iYWNrZ3JvdW5kLCAjZmZmKTtcbiAgICAgICAgbWFyZ2luOiB2YXIoLS1tYXJnaW4sIDApO1xuICAgIH1cblxuICAgIC5zZWxlY3RDb250YWluZXIgaW5wdXQge1xuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgY29sb3I6IHZhcigtLWlucHV0Q29sb3IsICMzZjRmNWYpO1xuICAgICAgICBoZWlnaHQ6IHZhcigtLWhlaWdodCwgNDJweCk7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiB2YXIoLS1oZWlnaHQsIDQycHgpO1xuICAgICAgICBwYWRkaW5nOiB2YXIoLS1pbnB1dFBhZGRpbmcsIHZhcigtLXBhZGRpbmcpKTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICBmb250LXNpemU6IHZhcigtLWlucHV0Rm9udFNpemUsIDE0cHgpO1xuICAgICAgICBsZXR0ZXItc3BhY2luZzogdmFyKC0taW5wdXRMZXR0ZXJTcGFjaW5nLCAtMC4wOHB4KTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBsZWZ0OiB2YXIoLS1pbnB1dExlZnQsIDApO1xuICAgICAgICBtYXJnaW46IHZhcigtLWlucHV0TWFyZ2luLCAwKTtcbiAgICB9XG5cbiAgICAuc2VsZWN0Q29udGFpbmVyIGlucHV0OjpwbGFjZWhvbGRlciB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1wbGFjZWhvbGRlckNvbG9yLCAjNzg4NDhmKTtcbiAgICAgICAgb3BhY2l0eTogdmFyKC0tcGxhY2Vob2xkZXJPcGFjaXR5LCAxKTtcbiAgICB9XG5cbiAgICAuc2VsZWN0Q29udGFpbmVyIGlucHV0OmZvY3VzIHtcbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICB9XG5cbiAgICAuc2VsZWN0Q29udGFpbmVyOmhvdmVyIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1ib3JkZXJIb3ZlckNvbG9yLCAjYjJiOGJmKTtcbiAgICB9XG5cbiAgICAuc2VsZWN0Q29udGFpbmVyLmZvY3VzZWQge1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLWJvcmRlckZvY3VzQ29sb3IsICMwMDZmZTgpO1xuICAgIH1cblxuICAgIC5zZWxlY3RDb250YWluZXIuZGlzYWJsZWQge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1kaXNhYmxlZEJhY2tncm91bmQsICNlYmVkZWYpO1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLWRpc2FibGVkQm9yZGVyQ29sb3IsICNlYmVkZWYpO1xuICAgICAgICBjb2xvcjogdmFyKC0tZGlzYWJsZWRDb2xvciwgI2MxYzZjYyk7XG4gICAgfVxuXG4gICAgLnNlbGVjdENvbnRhaW5lci5kaXNhYmxlZCBpbnB1dDo6cGxhY2Vob2xkZXIge1xuICAgICAgICBjb2xvcjogdmFyKC0tZGlzYWJsZWRQbGFjZWhvbGRlckNvbG9yLCAjYzFjNmNjKTtcbiAgICAgICAgb3BhY2l0eTogdmFyKC0tZGlzYWJsZWRQbGFjZWhvbGRlck9wYWNpdHksIDEpO1xuICAgIH1cblxuICAgIC5zZWxlY3RlZEl0ZW0ge1xuICAgICAgICBsaW5lLWhlaWdodDogdmFyKC0taGVpZ2h0LCA0MnB4KTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1oZWlnaHQsIDQycHgpO1xuICAgICAgICBvdmVyZmxvdy14OiBoaWRkZW47XG4gICAgICAgIHBhZGRpbmc6IHZhcigtLXNlbGVjdGVkSXRlbVBhZGRpbmcsIDAgMjBweCAwIDApO1xuICAgIH1cblxuICAgIC5zZWxlY3RlZEl0ZW06Zm9jdXMge1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgIH1cblxuICAgIC5jbGVhclNlbGVjdCB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgcmlnaHQ6IHZhcigtLWNsZWFyU2VsZWN0UmlnaHQsIDEwcHgpO1xuICAgICAgICB0b3A6IHZhcigtLWNsZWFyU2VsZWN0VG9wLCAxMXB4KTtcbiAgICAgICAgYm90dG9tOiB2YXIoLS1jbGVhclNlbGVjdEJvdHRvbSwgMTFweCk7XG4gICAgICAgIHdpZHRoOiB2YXIoLS1jbGVhclNlbGVjdFdpZHRoLCAyMHB4KTtcbiAgICAgICAgY29sb3I6IHZhcigtLWNsZWFyU2VsZWN0Q29sb3IsICNjNWNhY2YpO1xuICAgICAgICBmbGV4OiBub25lICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLmNsZWFyU2VsZWN0OmhvdmVyIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWNsZWFyU2VsZWN0SG92ZXJDb2xvciwgIzJjM2U1MCk7XG4gICAgfVxuXG4gICAgLnNlbGVjdENvbnRhaW5lci5mb2N1c2VkIC5jbGVhclNlbGVjdCB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1jbGVhclNlbGVjdEZvY3VzQ29sb3IsICMzZjRmNWYpO1xuICAgIH1cblxuICAgIC5pbmRpY2F0b3Ige1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHJpZ2h0OiB2YXIoLS1pbmRpY2F0b3JSaWdodCwgMTBweCk7XG4gICAgICAgIHRvcDogdmFyKC0taW5kaWNhdG9yVG9wLCAxMXB4KTtcbiAgICAgICAgd2lkdGg6IHZhcigtLWluZGljYXRvcldpZHRoLCAyMHB4KTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1pbmRpY2F0b3JIZWlnaHQsIDIwcHgpO1xuICAgICAgICBjb2xvcjogdmFyKC0taW5kaWNhdG9yQ29sb3IsICNjNWNhY2YpO1xuICAgIH1cblxuICAgIC5pbmRpY2F0b3Igc3ZnIHtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBmaWxsOiB2YXIoLS1pbmRpY2F0b3JGaWxsLCBjdXJyZW50Y29sb3IpO1xuICAgICAgICBsaW5lLWhlaWdodDogMTtcbiAgICAgICAgc3Ryb2tlOiB2YXIoLS1pbmRpY2F0b3JTdHJva2UsIGN1cnJlbnRjb2xvcik7XG4gICAgICAgIHN0cm9rZS13aWR0aDogMDtcbiAgICB9XG5cbiAgICAuc3Bpbm5lciB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgcmlnaHQ6IHZhcigtLXNwaW5uZXJSaWdodCwgMTBweCk7XG4gICAgICAgIHRvcDogdmFyKC0tc3Bpbm5lckxlZnQsIDExcHgpO1xuICAgICAgICB3aWR0aDogdmFyKC0tc3Bpbm5lcldpZHRoLCAyMHB4KTtcbiAgICAgICAgaGVpZ2h0OiB2YXIoLS1zcGlubmVySGVpZ2h0LCAyMHB4KTtcbiAgICAgICAgY29sb3I6IHZhcigtLXNwaW5uZXJDb2xvciwgIzUxY2U2Yyk7XG4gICAgICAgIGFuaW1hdGlvbjogcm90YXRlIDAuNzVzIGxpbmVhciBpbmZpbml0ZTtcbiAgICB9XG5cbiAgICAuc3Bpbm5lcl9pY29uIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGNlbnRlcjtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBib3R0b206IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiBub25lO1xuICAgIH1cblxuICAgIC5zcGlubmVyX3BhdGgge1xuICAgICAgICBzdHJva2UtZGFzaGFycmF5OiA5MDtcbiAgICAgICAgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kO1xuICAgIH1cblxuICAgIC5tdWx0aVNlbGVjdCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIHBhZGRpbmc6IHZhcigtLW11bHRpU2VsZWN0UGFkZGluZywgMCAzNXB4IDAgMTZweCk7XG4gICAgICAgIGhlaWdodDogYXV0bztcbiAgICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICB9XG5cbiAgICAubXVsdGlTZWxlY3QgPiAqIHtcbiAgICAgICAgZmxleDogMSAxIDUwcHg7XG4gICAgfVxuXG4gICAgLnNlbGVjdENvbnRhaW5lci5tdWx0aVNlbGVjdCBpbnB1dCB7XG4gICAgICAgIHBhZGRpbmc6IHZhcigtLW11bHRpU2VsZWN0SW5wdXRQYWRkaW5nLCAwKTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICBtYXJnaW46IHZhcigtLW11bHRpU2VsZWN0SW5wdXRNYXJnaW4sIDApO1xuICAgIH1cblxuICAgIC5oYXNFcnJvciB7XG4gICAgICAgIGJvcmRlcjogdmFyKC0tZXJyb3JCb3JkZXIsIDFweCBzb2xpZCAjZmYyZDU1KTtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tZXJyb3JCYWNrZ3JvdW5kLCAjZmZmKTtcbiAgICB9XG5cbiAgICBAa2V5ZnJhbWVzIHJvdGF0ZSB7XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgfVxuICAgIH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6d2luZG93XG4gICAgb246Y2xpY2s9e2hhbmRsZVdpbmRvd0NsaWNrfVxuICAgIG9uOmtleWRvd249e2hhbmRsZUtleURvd259XG4gICAgb246cmVzaXplPXtnZXRQb3NpdGlvbn1cbi8+XG5cbjxkaXZcbiAgICBjbGFzcz1cInNlbGVjdENvbnRhaW5lciB7Y29udGFpbmVyQ2xhc3Nlc31cIlxuICAgIGNsYXNzOmhhc0Vycm9yXG4gICAgY2xhc3M6bXVsdGlTZWxlY3Q9e2lzTXVsdGl9XG4gICAgY2xhc3M6ZGlzYWJsZWQ9e2lzRGlzYWJsZWR9XG4gICAgY2xhc3M6Zm9jdXNlZD17aXNGb2N1c2VkfVxuICAgIHN0eWxlPXtjb250YWluZXJTdHlsZXN9XG4gICAgb246Y2xpY2s9e2hhbmRsZUNsaWNrfVxuICAgIGJpbmQ6dGhpcz17Y29udGFpbmVyfVxuPlxuICAgIHsjaWYgSWNvbn1cbiAgICAgICAgPHN2ZWx0ZTpjb21wb25lbnQgdGhpcz17SWNvbn0gey4uLmljb25Qcm9wc30gLz5cbiAgICB7L2lmfVxuXG4gICAgeyNpZiBpc011bHRpICYmIHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDB9XG4gICAgICAgIDxzdmVsdGU6Y29tcG9uZW50XG4gICAgICAgICAgICB0aGlzPXtNdWx0aVNlbGVjdGlvbn1cbiAgICAgICAgICAgIHt2YWx1ZX1cbiAgICAgICAgICAgIHtnZXRTZWxlY3Rpb25MYWJlbH1cbiAgICAgICAgICAgIHthY3RpdmV2YWx1ZX1cbiAgICAgICAgICAgIHtpc0Rpc2FibGVkfVxuICAgICAgICAgICAge211bHRpRnVsbEl0ZW1DbGVhcmFibGV9XG4gICAgICAgICAgICBvbjptdWx0aUl0ZW1DbGVhcj17aGFuZGxlTXVsdGlJdGVtQ2xlYXJ9XG4gICAgICAgICAgICBvbjpmb2N1cz17aGFuZGxlRm9jdXN9XG4gICAgICAgIC8+XG4gICAgey9pZn1cblxuICAgIHsjaWYgaXNEaXNhYmxlZH1cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB7Li4uX2lucHV0QXR0cmlidXRlc31cbiAgICAgICAgICAgIGJpbmQ6dGhpcz17aW5wdXR9XG4gICAgICAgICAgICBvbjpmb2N1cz17aGFuZGxlRm9jdXN9XG4gICAgICAgICAgICBiaW5kOnZhbHVlPXtmaWx0ZXJUZXh0fVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyVGV4dH1cbiAgICAgICAgICAgIHN0eWxlPXtpbnB1dFN0eWxlc31cbiAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgIC8+XG4gICAgezplbHNlfVxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHsuLi5faW5wdXRBdHRyaWJ1dGVzfVxuICAgICAgICAgICAgYmluZDp0aGlzPXtpbnB1dH1cbiAgICAgICAgICAgIG9uOmZvY3VzPXtoYW5kbGVGb2N1c31cbiAgICAgICAgICAgIGJpbmQ6dmFsdWU9e2ZpbHRlclRleHR9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJUZXh0fVxuICAgICAgICAgICAgc3R5bGU9e2lucHV0U3R5bGVzfVxuICAgICAgICAvPlxuICAgIHsvaWZ9XG5cbiAgICB7I2lmICFpc011bHRpICYmIHNob3dTZWxlY3RlZEl0ZW19XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RlZEl0ZW1cIiBvbjpmb2N1cz17aGFuZGxlRm9jdXN9PlxuICAgICAgICAgICAgPHN2ZWx0ZTpjb21wb25lbnRcbiAgICAgICAgICAgICAgICB0aGlzPXtTZWxlY3Rpb259XG4gICAgICAgICAgICAgICAgaXRlbT17dmFsdWV9XG4gICAgICAgICAgICAgICAge2dldFNlbGVjdGlvbkxhYmVsfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgey9pZn1cblxuICAgIHsjaWYgc2hvd1NlbGVjdGVkSXRlbSAmJiBpc0NsZWFyYWJsZSAmJiAhaXNEaXNhYmxlZCAmJiAhaXNXYWl0aW5nfVxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2xlYXJTZWxlY3RcIiBvbjpjbGlja3xwcmV2ZW50RGVmYXVsdD17aGFuZGxlQ2xlYXJ9PlxuICAgICAgICAgICAgPHN2ZWx0ZTpjb21wb25lbnQgdGhpcz17Q2xlYXJJY29ufSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB7L2lmfVxuXG4gICAgeyNpZiBzaG93SW5kaWNhdG9yIHx8IChzaG93Q2hldnJvbiAmJiAhdmFsdWUpIHx8ICghaXNTZWFyY2hhYmxlICYmICFpc0Rpc2FibGVkICYmICFpc1dhaXRpbmcgJiYgKChzaG93U2VsZWN0ZWRJdGVtICYmICFpc0NsZWFyYWJsZSkgfHwgIXNob3dTZWxlY3RlZEl0ZW0pKX1cbiAgICAgICAgPGRpdiBjbGFzcz1cImluZGljYXRvclwiPlxuICAgICAgICAgICAgeyNpZiBpbmRpY2F0b3JTdmd9XG4gICAgICAgICAgICAgICAge0BodG1sIGluZGljYXRvclN2Z31cbiAgICAgICAgICAgIHs6ZWxzZX1cbiAgICAgICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodD1cIjEwMCVcIlxuICAgICAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDIwIDIwXCJcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNNC41MTYgNy41NDhjMC40MzYtMC40NDYgMS4wNDMtMC40ODEgMS41NzYgMGwzLjkwOCAzLjc0N1xuICAgICAgICAgIDMuOTA4LTMuNzQ3YzAuNTMzLTAuNDgxIDEuMTQxLTAuNDQ2IDEuNTc0IDAgMC40MzYgMC40NDUgMC40MDggMS4xOTcgMFxuICAgICAgICAgIDEuNjE1LTAuNDA2IDAuNDE4LTQuNjk1IDQuNTAyLTQuNjk1IDQuNTAyLTAuMjE3IDAuMjIzLTAuNTAyXG4gICAgICAgICAgMC4zMzUtMC43ODcgMC4zMzVzLTAuNTctMC4xMTItMC43ODktMC4zMzVjMFxuICAgICAgICAgIDAtNC4yODctNC4wODQtNC42OTUtNC41MDJzLTAuNDM2LTEuMTcgMC0xLjYxNXpcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgey9pZn1cbiAgICAgICAgPC9kaXY+XG4gICAgey9pZn1cblxuICAgIHsjaWYgaXNXYWl0aW5nfVxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lclwiPlxuICAgICAgICAgICAgPHN2ZyBjbGFzcz1cInNwaW5uZXJfaWNvblwiIHZpZXdCb3g9XCIyNSAyNSA1MCA1MFwiPlxuICAgICAgICAgICAgICAgIDxjaXJjbGVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJzcGlubmVyX3BhdGhcIlxuICAgICAgICAgICAgICAgICAgICBjeD1cIjUwXCJcbiAgICAgICAgICAgICAgICAgICAgY3k9XCI1MFwiXG4gICAgICAgICAgICAgICAgICAgIHI9XCIyMFwiXG4gICAgICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlLXdpZHRoPVwiNVwiXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgey9pZn1cbjwvZGl2PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXF1QkksZ0JBQWdCLDhCQUFDLENBQUMsQUFDZCxTQUFTLENBQUUsTUFBTSxDQUVqQixNQUFNLENBQUUsSUFBSSxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FDeEMsYUFBYSxDQUFFLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUN2QyxNQUFNLENBQUUsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQzNCLFFBQVEsQ0FBRSxRQUFRLENBQ2xCLE9BQU8sQ0FBRSxJQUFJLENBQ2IsV0FBVyxDQUFFLE1BQU0sQ0FDbkIsT0FBTyxDQUFFLElBQUksU0FBUyxDQUFDLENBQ3ZCLFVBQVUsQ0FBRSxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FDbkMsTUFBTSxDQUFFLElBQUksUUFBUSxDQUFDLEVBQUUsQ0FBQyxBQUM1QixDQUFDLEFBRUQsK0JBQWdCLENBQUMsS0FBSyxlQUFDLENBQUMsQUFDcEIsTUFBTSxDQUFFLE9BQU8sQ0FDZixNQUFNLENBQUUsSUFBSSxDQUNaLEtBQUssQ0FBRSxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FDakMsTUFBTSxDQUFFLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUMzQixXQUFXLENBQUUsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQ2hDLE9BQU8sQ0FBRSxJQUFJLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FDNUMsS0FBSyxDQUFFLElBQUksQ0FDWCxVQUFVLENBQUUsV0FBVyxDQUN2QixTQUFTLENBQUUsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQ3JDLGNBQWMsQ0FBRSxJQUFJLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUNsRCxRQUFRLENBQUUsUUFBUSxDQUNsQixJQUFJLENBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQ3pCLE1BQU0sQ0FBRSxJQUFJLGFBQWEsQ0FBQyxFQUFFLENBQUMsQUFDakMsQ0FBQyxBQUVELCtCQUFnQixDQUFDLG9CQUFLLGFBQWEsQUFBQyxDQUFDLEFBQ2pDLEtBQUssQ0FBRSxJQUFJLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUN2QyxPQUFPLENBQUUsSUFBSSxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQUFDekMsQ0FBQyxBQUVELCtCQUFnQixDQUFDLG9CQUFLLE1BQU0sQUFBQyxDQUFDLEFBQzFCLE9BQU8sQ0FBRSxJQUFJLEFBQ2pCLENBQUMsQUFFRCw4Q0FBZ0IsTUFBTSxBQUFDLENBQUMsQUFDcEIsWUFBWSxDQUFFLElBQUksa0JBQWtCLENBQUMsUUFBUSxDQUFDLEFBQ2xELENBQUMsQUFFRCxnQkFBZ0IsUUFBUSw4QkFBQyxDQUFDLEFBQ3RCLFlBQVksQ0FBRSxJQUFJLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxBQUNsRCxDQUFDLEFBRUQsZ0JBQWdCLFNBQVMsOEJBQUMsQ0FBQyxBQUN2QixVQUFVLENBQUUsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FDOUMsWUFBWSxDQUFFLElBQUkscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQ2pELEtBQUssQ0FBRSxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsQUFDeEMsQ0FBQyxBQUVELGdCQUFnQix3QkFBUyxDQUFDLG9CQUFLLGFBQWEsQUFBQyxDQUFDLEFBQzFDLEtBQUssQ0FBRSxJQUFJLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxDQUMvQyxPQUFPLENBQUUsSUFBSSw0QkFBNEIsQ0FBQyxFQUFFLENBQUMsQUFDakQsQ0FBQyxBQUVELGFBQWEsOEJBQUMsQ0FBQyxBQUNYLFdBQVcsQ0FBRSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FDaEMsTUFBTSxDQUFFLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUMzQixVQUFVLENBQUUsTUFBTSxDQUNsQixPQUFPLENBQUUsSUFBSSxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQUFDbkQsQ0FBQyxBQUVELDJDQUFhLE1BQU0sQUFBQyxDQUFDLEFBQ2pCLE9BQU8sQ0FBRSxJQUFJLEFBQ2pCLENBQUMsQUFFRCxZQUFZLDhCQUFDLENBQUMsQUFDVixRQUFRLENBQUUsUUFBUSxDQUNsQixLQUFLLENBQUUsSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FDcEMsR0FBRyxDQUFFLElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQ2hDLE1BQU0sQ0FBRSxJQUFJLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUN0QyxLQUFLLENBQUUsSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FDcEMsS0FBSyxDQUFFLElBQUksa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQ3ZDLElBQUksQ0FBRSxJQUFJLENBQUMsVUFBVSxBQUN6QixDQUFDLEFBRUQsMENBQVksTUFBTSxBQUFDLENBQUMsQUFDaEIsS0FBSyxDQUFFLElBQUksdUJBQXVCLENBQUMsUUFBUSxDQUFDLEFBQ2hELENBQUMsQUFFRCxnQkFBZ0IsdUJBQVEsQ0FBQyxZQUFZLGVBQUMsQ0FBQyxBQUNuQyxLQUFLLENBQUUsSUFBSSx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsQUFDaEQsQ0FBQyxBQUVELFVBQVUsOEJBQUMsQ0FBQyxBQUNSLFFBQVEsQ0FBRSxRQUFRLENBQ2xCLEtBQUssQ0FBRSxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUNsQyxHQUFHLENBQUUsSUFBSSxjQUFjLENBQUMsS0FBSyxDQUFDLENBQzlCLEtBQUssQ0FBRSxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUNsQyxNQUFNLENBQUUsSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FDcEMsS0FBSyxDQUFFLElBQUksZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEFBQ3pDLENBQUMsQUFFRCx5QkFBVSxDQUFDLEdBQUcsZUFBQyxDQUFDLEFBQ1osT0FBTyxDQUFFLFlBQVksQ0FDckIsSUFBSSxDQUFFLElBQUksZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUN4QyxXQUFXLENBQUUsQ0FBQyxDQUNkLE1BQU0sQ0FBRSxJQUFJLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUM1QyxZQUFZLENBQUUsQ0FBQyxBQUNuQixDQUFDLEFBRUQsUUFBUSw4QkFBQyxDQUFDLEFBQ04sUUFBUSxDQUFFLFFBQVEsQ0FDbEIsS0FBSyxDQUFFLElBQUksY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUNoQyxHQUFHLENBQUUsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQzdCLEtBQUssQ0FBRSxJQUFJLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FDaEMsTUFBTSxDQUFFLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUNsQyxLQUFLLENBQUUsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQ25DLFNBQVMsQ0FBRSxxQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxBQUMzQyxDQUFDLEFBRUQsYUFBYSw4QkFBQyxDQUFDLEFBQ1gsT0FBTyxDQUFFLEtBQUssQ0FDZCxNQUFNLENBQUUsSUFBSSxDQUNaLGdCQUFnQixDQUFFLE1BQU0sQ0FBQyxNQUFNLENBQy9CLEtBQUssQ0FBRSxJQUFJLENBQ1gsUUFBUSxDQUFFLFFBQVEsQ0FDbEIsR0FBRyxDQUFFLENBQUMsQ0FDTixNQUFNLENBQUUsQ0FBQyxDQUNULElBQUksQ0FBRSxDQUFDLENBQ1AsS0FBSyxDQUFFLENBQUMsQ0FDUixNQUFNLENBQUUsSUFBSSxDQUNaLGlCQUFpQixDQUFFLElBQUksQUFDM0IsQ0FBQyxBQUVELGFBQWEsOEJBQUMsQ0FBQyxBQUNYLGdCQUFnQixDQUFFLEVBQUUsQ0FDcEIsY0FBYyxDQUFFLEtBQUssQUFDekIsQ0FBQyxBQUVELFlBQVksOEJBQUMsQ0FBQyxBQUNWLE9BQU8sQ0FBRSxJQUFJLENBQ2IsT0FBTyxDQUFFLElBQUksb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQ2pELE1BQU0sQ0FBRSxJQUFJLENBQ1osU0FBUyxDQUFFLElBQUksQ0FDZixXQUFXLENBQUUsT0FBTyxBQUN4QixDQUFDLEFBRUQsMkJBQVksQ0FBRyxlQUFFLENBQUMsQUFDZCxJQUFJLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEFBQ2xCLENBQUMsQUFFRCxnQkFBZ0IsMkJBQVksQ0FBQyxLQUFLLGVBQUMsQ0FBQyxBQUNoQyxPQUFPLENBQUUsSUFBSSx5QkFBeUIsQ0FBQyxFQUFFLENBQUMsQ0FDMUMsUUFBUSxDQUFFLFFBQVEsQ0FDbEIsTUFBTSxDQUFFLElBQUksd0JBQXdCLENBQUMsRUFBRSxDQUFDLEFBQzVDLENBQUMsQUFFRCxTQUFTLDhCQUFDLENBQUMsQUFDUCxNQUFNLENBQUUsSUFBSSxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FDN0MsVUFBVSxDQUFFLElBQUksaUJBQWlCLENBQUMsS0FBSyxDQUFDLEFBQzVDLENBQUMsQUFFRCxXQUFXLHFCQUFPLENBQUMsQUFDZixJQUFJLEFBQUMsQ0FBQyxBQUNGLFNBQVMsQ0FBRSxPQUFPLE1BQU0sQ0FBQyxBQUM3QixDQUFDLEFBQ0wsQ0FBQyJ9 */";
	append_dev(document_1.head, style);
}

// (921:4) {#if Icon}
function create_if_block_7(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*iconProps*/ ctx[18]];
	var switch_value = /*Icon*/ ctx[17];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty[0] & /*iconProps*/ 262144)
			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*iconProps*/ ctx[18])])
			: {};

			if (switch_value !== (switch_value = /*Icon*/ ctx[17])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_7.name,
		type: "if",
		source: "(921:4) {#if Icon}",
		ctx
	});

	return block;
}

// (925:4) {#if isMulti && value && value.length > 0}
function create_if_block_6(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*MultiSelection*/ ctx[7];

	function switch_props(ctx) {
		return {
			props: {
				value: /*value*/ ctx[2],
				getSelectionLabel: /*getSelectionLabel*/ ctx[13],
				activevalue: /*activevalue*/ ctx[25],
				isDisabled: /*isDisabled*/ ctx[10],
				multiFullItemClearable: /*multiFullItemClearable*/ ctx[9]
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		switch_instance.$on("multiItemClear", /*handleMultiItemClear*/ ctx[29]);
		switch_instance.$on("focus", /*handleFocus*/ ctx[32]);
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty[0] & /*value*/ 4) switch_instance_changes.value = /*value*/ ctx[2];
			if (dirty[0] & /*getSelectionLabel*/ 8192) switch_instance_changes.getSelectionLabel = /*getSelectionLabel*/ ctx[13];
			if (dirty[0] & /*activevalue*/ 33554432) switch_instance_changes.activevalue = /*activevalue*/ ctx[25];
			if (dirty[0] & /*isDisabled*/ 1024) switch_instance_changes.isDisabled = /*isDisabled*/ ctx[10];
			if (dirty[0] & /*multiFullItemClearable*/ 512) switch_instance_changes.multiFullItemClearable = /*multiFullItemClearable*/ ctx[9];

			if (switch_value !== (switch_value = /*MultiSelection*/ ctx[7])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					switch_instance.$on("multiItemClear", /*handleMultiItemClear*/ ctx[29]);
					switch_instance.$on("focus", /*handleFocus*/ ctx[32]);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_6.name,
		type: "if",
		source: "(925:4) {#if isMulti && value && value.length > 0}",
		ctx
	});

	return block;
}

// (948:4) {:else}
function create_else_block_1(ctx) {
	let input_1;
	let mounted;
	let dispose;

	let input_1_levels = [
		/*_inputAttributes*/ ctx[26],
		{ placeholder: /*placeholderText*/ ctx[28] },
		{ style: /*inputStyles*/ ctx[15] }
	];

	let input_1_data = {};

	for (let i = 0; i < input_1_levels.length; i += 1) {
		input_1_data = assign(input_1_data, input_1_levels[i]);
	}

	const block = {
		c: function create() {
			input_1 = element("input");
			set_attributes(input_1, input_1_data);
			toggle_class(input_1, "svelte-1ri8kk0", true);
			add_location(input_1, file$7, 948, 8, 25542);
		},
		m: function mount(target, anchor) {
			insert_dev(target, input_1, anchor);
			/*input_1_binding_1*/ ctx[66](input_1);
			set_input_value(input_1, /*filterText*/ ctx[3]);

			if (!mounted) {
				dispose = [
					listen_dev(input_1, "focus", /*handleFocus*/ ctx[32], false, false, false),
					listen_dev(input_1, "input", /*input_1_input_handler_1*/ ctx[67])
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			set_attributes(input_1, input_1_data = get_spread_update(input_1_levels, [
				dirty[0] & /*_inputAttributes*/ 67108864 && /*_inputAttributes*/ ctx[26],
				dirty[0] & /*placeholderText*/ 268435456 && { placeholder: /*placeholderText*/ ctx[28] },
				dirty[0] & /*inputStyles*/ 32768 && { style: /*inputStyles*/ ctx[15] }
			]));

			if (dirty[0] & /*filterText*/ 8 && input_1.value !== /*filterText*/ ctx[3]) {
				set_input_value(input_1, /*filterText*/ ctx[3]);
			}

			toggle_class(input_1, "svelte-1ri8kk0", true);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(input_1);
			/*input_1_binding_1*/ ctx[66](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block_1.name,
		type: "else",
		source: "(948:4) {:else}",
		ctx
	});

	return block;
}

// (938:4) {#if isDisabled}
function create_if_block_5(ctx) {
	let input_1;
	let mounted;
	let dispose;

	let input_1_levels = [
		/*_inputAttributes*/ ctx[26],
		{ placeholder: /*placeholderText*/ ctx[28] },
		{ style: /*inputStyles*/ ctx[15] },
		{ disabled: true }
	];

	let input_1_data = {};

	for (let i = 0; i < input_1_levels.length; i += 1) {
		input_1_data = assign(input_1_data, input_1_levels[i]);
	}

	const block = {
		c: function create() {
			input_1 = element("input");
			set_attributes(input_1, input_1_data);
			toggle_class(input_1, "svelte-1ri8kk0", true);
			add_location(input_1, file$7, 938, 8, 25274);
		},
		m: function mount(target, anchor) {
			insert_dev(target, input_1, anchor);
			/*input_1_binding*/ ctx[64](input_1);
			set_input_value(input_1, /*filterText*/ ctx[3]);

			if (!mounted) {
				dispose = [
					listen_dev(input_1, "focus", /*handleFocus*/ ctx[32], false, false, false),
					listen_dev(input_1, "input", /*input_1_input_handler*/ ctx[65])
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			set_attributes(input_1, input_1_data = get_spread_update(input_1_levels, [
				dirty[0] & /*_inputAttributes*/ 67108864 && /*_inputAttributes*/ ctx[26],
				dirty[0] & /*placeholderText*/ 268435456 && { placeholder: /*placeholderText*/ ctx[28] },
				dirty[0] & /*inputStyles*/ 32768 && { style: /*inputStyles*/ ctx[15] },
				{ disabled: true }
			]));

			if (dirty[0] & /*filterText*/ 8 && input_1.value !== /*filterText*/ ctx[3]) {
				set_input_value(input_1, /*filterText*/ ctx[3]);
			}

			toggle_class(input_1, "svelte-1ri8kk0", true);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(input_1);
			/*input_1_binding*/ ctx[64](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(938:4) {#if isDisabled}",
		ctx
	});

	return block;
}

// (959:4) {#if !isMulti && showSelectedItem}
function create_if_block_4(ctx) {
	let div;
	let switch_instance;
	let current;
	let mounted;
	let dispose;
	var switch_value = /*Selection*/ ctx[6];

	function switch_props(ctx) {
		return {
			props: {
				item: /*value*/ ctx[2],
				getSelectionLabel: /*getSelectionLabel*/ ctx[13]
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			attr_dev(div, "class", "selectedItem svelte-1ri8kk0");
			add_location(div, file$7, 959, 8, 25827);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			current = true;

			if (!mounted) {
				dispose = listen_dev(div, "focus", /*handleFocus*/ ctx[32], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty[0] & /*value*/ 4) switch_instance_changes.item = /*value*/ ctx[2];
			if (dirty[0] & /*getSelectionLabel*/ 8192) switch_instance_changes.getSelectionLabel = /*getSelectionLabel*/ ctx[13];

			if (switch_value !== (switch_value = /*Selection*/ ctx[6])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (switch_instance) destroy_component(switch_instance);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(959:4) {#if !isMulti && showSelectedItem}",
		ctx
	});

	return block;
}

// (969:4) {#if showSelectedItem && isClearable && !isDisabled && !isWaiting}
function create_if_block_3(ctx) {
	let div;
	let switch_instance;
	let current;
	let mounted;
	let dispose;
	var switch_value = /*ClearIcon*/ ctx[23];

	function switch_props(ctx) {
		return { $$inline: true };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			attr_dev(div, "class", "clearSelect svelte-1ri8kk0");
			add_location(div, file$7, 969, 8, 26125);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			current = true;

			if (!mounted) {
				dispose = listen_dev(div, "click", prevent_default(/*handleClear*/ ctx[24]), false, true, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (switch_value !== (switch_value = /*ClearIcon*/ ctx[23])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, null);
				} else {
					switch_instance = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (switch_instance) destroy_component(switch_instance);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(969:4) {#if showSelectedItem && isClearable && !isDisabled && !isWaiting}",
		ctx
	});

	return block;
}

// (975:4) {#if showIndicator || (showChevron && !value) || (!isSearchable && !isDisabled && !isWaiting && ((showSelectedItem && !isClearable) || !showSelectedItem))}
function create_if_block_1(ctx) {
	let div;

	function select_block_type_1(ctx, dirty) {
		if (/*indicatorSvg*/ ctx[22]) return create_if_block_2;
		return create_else_block;
	}

	let current_block_type = select_block_type_1(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			div = element("div");
			if_block.c();
			attr_dev(div, "class", "indicator svelte-1ri8kk0");
			add_location(div, file$7, 975, 8, 26433);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if_block.m(div, null);
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(975:4) {#if showIndicator || (showChevron && !value) || (!isSearchable && !isDisabled && !isWaiting && ((showSelectedItem && !isClearable) || !showSelectedItem))}",
		ctx
	});

	return block;
}

// (979:12) {:else}
function create_else_block(ctx) {
	let svg;
	let path;

	const block = {
		c: function create() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "d", "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747\n          3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0\n          1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502\n          0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0\n          0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z");
			add_location(path, file$7, 985, 20, 26749);
			attr_dev(svg, "width", "100%");
			attr_dev(svg, "height", "100%");
			attr_dev(svg, "viewBox", "0 0 20 20");
			attr_dev(svg, "focusable", "false");
			attr_dev(svg, "class", "svelte-1ri8kk0");
			add_location(svg, file$7, 979, 16, 26561);
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, path);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(979:12) {:else}",
		ctx
	});

	return block;
}

// (977:12) {#if indicatorSvg}
function create_if_block_2(ctx) {
	let html_tag;
	let html_anchor;

	const block = {
		c: function create() {
			html_anchor = empty();
			html_tag = new HtmlTag(html_anchor);
		},
		m: function mount(target, anchor) {
			html_tag.m(/*indicatorSvg*/ ctx[22], target, anchor);
			insert_dev(target, html_anchor, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*indicatorSvg*/ 4194304) html_tag.p(/*indicatorSvg*/ ctx[22]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(html_anchor);
			if (detaching) html_tag.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(977:12) {#if indicatorSvg}",
		ctx
	});

	return block;
}

// (998:4) {#if isWaiting}
function create_if_block(ctx) {
	let div;
	let svg;
	let circle;

	const block = {
		c: function create() {
			div = element("div");
			svg = svg_element("svg");
			circle = svg_element("circle");
			attr_dev(circle, "class", "spinner_path svelte-1ri8kk0");
			attr_dev(circle, "cx", "50");
			attr_dev(circle, "cy", "50");
			attr_dev(circle, "r", "20");
			attr_dev(circle, "fill", "none");
			attr_dev(circle, "stroke", "currentColor");
			attr_dev(circle, "stroke-width", "5");
			attr_dev(circle, "stroke-miterlimit", "10");
			add_location(circle, file$7, 1000, 16, 27318);
			attr_dev(svg, "class", "spinner_icon svelte-1ri8kk0");
			attr_dev(svg, "viewBox", "25 25 50 50");
			add_location(svg, file$7, 999, 12, 27253);
			attr_dev(div, "class", "spinner svelte-1ri8kk0");
			add_location(div, file$7, 998, 8, 27219);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, svg);
			append_dev(svg, circle);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(998:4) {#if isWaiting}",
		ctx
	});

	return block;
}

function create_fragment$7(ctx) {
	let div;
	let t0;
	let t1;
	let t2;
	let t3;
	let t4;
	let t5;
	let div_class_value;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*Icon*/ ctx[17] && create_if_block_7(ctx);
	let if_block1 = /*isMulti*/ ctx[8] && /*value*/ ctx[2] && /*value*/ ctx[2].length > 0 && create_if_block_6(ctx);

	function select_block_type(ctx, dirty) {
		if (/*isDisabled*/ ctx[10]) return create_if_block_5;
		return create_else_block_1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block2 = current_block_type(ctx);
	let if_block3 = !/*isMulti*/ ctx[8] && /*showSelectedItem*/ ctx[27] && create_if_block_4(ctx);
	let if_block4 = /*showSelectedItem*/ ctx[27] && /*isClearable*/ ctx[16] && !/*isDisabled*/ ctx[10] && !/*isWaiting*/ ctx[5] && create_if_block_3(ctx);
	let if_block5 = (/*showIndicator*/ ctx[20] || /*showChevron*/ ctx[19] && !/*value*/ ctx[2] || !/*isSearchable*/ ctx[14] && !/*isDisabled*/ ctx[10] && !/*isWaiting*/ ctx[5] && (/*showSelectedItem*/ ctx[27] && !/*isClearable*/ ctx[16] || !/*showSelectedItem*/ ctx[27])) && create_if_block_1(ctx);
	let if_block6 = /*isWaiting*/ ctx[5] && create_if_block(ctx);

	const block = {
		c: function create() {
			div = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			if_block2.c();
			t2 = space();
			if (if_block3) if_block3.c();
			t3 = space();
			if (if_block4) if_block4.c();
			t4 = space();
			if (if_block5) if_block5.c();
			t5 = space();
			if (if_block6) if_block6.c();
			attr_dev(div, "class", div_class_value = "selectContainer " + /*containerClasses*/ ctx[21] + " svelte-1ri8kk0");
			attr_dev(div, "style", /*containerStyles*/ ctx[12]);
			toggle_class(div, "hasError", /*hasError*/ ctx[11]);
			toggle_class(div, "multiSelect", /*isMulti*/ ctx[8]);
			toggle_class(div, "disabled", /*isDisabled*/ ctx[10]);
			toggle_class(div, "focused", /*isFocused*/ ctx[1]);
			add_location(div, file$7, 910, 0, 24558);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append_dev(div, t0);
			if (if_block1) if_block1.m(div, null);
			append_dev(div, t1);
			if_block2.m(div, null);
			append_dev(div, t2);
			if (if_block3) if_block3.m(div, null);
			append_dev(div, t3);
			if (if_block4) if_block4.m(div, null);
			append_dev(div, t4);
			if (if_block5) if_block5.m(div, null);
			append_dev(div, t5);
			if (if_block6) if_block6.m(div, null);
			/*div_binding*/ ctx[68](div);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(window, "click", /*handleWindowClick*/ ctx[33], false, false, false),
					listen_dev(window, "keydown", /*handleKeyDown*/ ctx[31], false, false, false),
					listen_dev(window, "resize", /*getPosition*/ ctx[30], false, false, false),
					listen_dev(div, "click", /*handleClick*/ ctx[34], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*Icon*/ ctx[17]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*Icon*/ 131072) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_7(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*isMulti*/ ctx[8] && /*value*/ ctx[2] && /*value*/ ctx[2].length > 0) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*isMulti, value*/ 260) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_6(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div, t1);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block2) {
				if_block2.p(ctx, dirty);
			} else {
				if_block2.d(1);
				if_block2 = current_block_type(ctx);

				if (if_block2) {
					if_block2.c();
					if_block2.m(div, t2);
				}
			}

			if (!/*isMulti*/ ctx[8] && /*showSelectedItem*/ ctx[27]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);

					if (dirty[0] & /*isMulti, showSelectedItem*/ 134217984) {
						transition_in(if_block3, 1);
					}
				} else {
					if_block3 = create_if_block_4(ctx);
					if_block3.c();
					transition_in(if_block3, 1);
					if_block3.m(div, t3);
				}
			} else if (if_block3) {
				group_outros();

				transition_out(if_block3, 1, 1, () => {
					if_block3 = null;
				});

				check_outros();
			}

			if (/*showSelectedItem*/ ctx[27] && /*isClearable*/ ctx[16] && !/*isDisabled*/ ctx[10] && !/*isWaiting*/ ctx[5]) {
				if (if_block4) {
					if_block4.p(ctx, dirty);

					if (dirty[0] & /*showSelectedItem, isClearable, isDisabled, isWaiting*/ 134284320) {
						transition_in(if_block4, 1);
					}
				} else {
					if_block4 = create_if_block_3(ctx);
					if_block4.c();
					transition_in(if_block4, 1);
					if_block4.m(div, t4);
				}
			} else if (if_block4) {
				group_outros();

				transition_out(if_block4, 1, 1, () => {
					if_block4 = null;
				});

				check_outros();
			}

			if (/*showIndicator*/ ctx[20] || /*showChevron*/ ctx[19] && !/*value*/ ctx[2] || !/*isSearchable*/ ctx[14] && !/*isDisabled*/ ctx[10] && !/*isWaiting*/ ctx[5] && (/*showSelectedItem*/ ctx[27] && !/*isClearable*/ ctx[16] || !/*showSelectedItem*/ ctx[27])) {
				if (if_block5) {
					if_block5.p(ctx, dirty);
				} else {
					if_block5 = create_if_block_1(ctx);
					if_block5.c();
					if_block5.m(div, t5);
				}
			} else if (if_block5) {
				if_block5.d(1);
				if_block5 = null;
			}

			if (/*isWaiting*/ ctx[5]) {
				if (if_block6) ; else {
					if_block6 = create_if_block(ctx);
					if_block6.c();
					if_block6.m(div, null);
				}
			} else if (if_block6) {
				if_block6.d(1);
				if_block6 = null;
			}

			if (!current || dirty[0] & /*containerClasses*/ 2097152 && div_class_value !== (div_class_value = "selectContainer " + /*containerClasses*/ ctx[21] + " svelte-1ri8kk0")) {
				attr_dev(div, "class", div_class_value);
			}

			if (!current || dirty[0] & /*containerStyles*/ 4096) {
				attr_dev(div, "style", /*containerStyles*/ ctx[12]);
			}

			if (dirty[0] & /*containerClasses, hasError*/ 2099200) {
				toggle_class(div, "hasError", /*hasError*/ ctx[11]);
			}

			if (dirty[0] & /*containerClasses, isMulti*/ 2097408) {
				toggle_class(div, "multiSelect", /*isMulti*/ ctx[8]);
			}

			if (dirty[0] & /*containerClasses, isDisabled*/ 2098176) {
				toggle_class(div, "disabled", /*isDisabled*/ ctx[10]);
			}

			if (dirty[0] & /*containerClasses, isFocused*/ 2097154) {
				toggle_class(div, "focused", /*isFocused*/ ctx[1]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block3);
			transition_in(if_block4);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(if_block3);
			transition_out(if_block4);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if_block2.d();
			if (if_block3) if_block3.d();
			if (if_block4) if_block4.d();
			if (if_block5) if_block5.d();
			if (if_block6) if_block6.d();
			/*div_binding*/ ctx[68](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$7($$self, $$props, $$invalidate) {
	let showSelectedItem;
	let placeholderText;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Select", slots, []);
	const dispatch = createEventDispatcher();
	let { container = undefined } = $$props;
	let { input = undefined } = $$props;
	let { Item: Item$1 = Item } = $$props;
	let { Selection: Selection$1 = Selection } = $$props;
	let { MultiSelection: MultiSelection$1 = MultiSelection } = $$props;
	let { isMulti = false } = $$props;
	let { multiFullItemClearable = false } = $$props;
	let { isDisabled = false } = $$props;
	let { isCreatable = false } = $$props;
	let { isFocused = false } = $$props;
	let { value = undefined } = $$props;
	let { filterText = "" } = $$props;
	let { placeholder = "Select..." } = $$props;
	let { items = [] } = $$props;
	let { itemFilter = (label, filterText, option) => label.toLowerCase().includes(filterText.toLowerCase()) } = $$props;
	let { groupBy = undefined } = $$props;
	let { groupFilter = groups => groups } = $$props;
	let { isGroupHeaderSelectable = false } = $$props;

	let { getGroupHeaderLabel = option => {
		return option.label;
	} } = $$props;

	let { getOptionLabel = (option, filterText) => {
		return option.isCreator
		? `Create \"${filterText}\"`
		: option.label;
	} } = $$props;

	let { optionIdentifier = "value" } = $$props;
	let { loadOptions = undefined } = $$props;
	let { hasError = false } = $$props;
	let { containerStyles = "" } = $$props;

	let { getSelectionLabel = option => {
		if (option) return option.label;
	} } = $$props;

	let { createGroupHeaderItem = groupValue => {
		return { value: groupValue, label: groupValue };
	} } = $$props;

	let { createItem = filterText => {
		return { value: filterText, label: filterText };
	} } = $$props;

	let { isSearchable = true } = $$props;
	let { inputStyles = "" } = $$props;
	let { isClearable = true } = $$props;
	let { isWaiting = false } = $$props;
	let { listPlacement = "auto" } = $$props;
	let { listOpen = false } = $$props;
	let { list = undefined } = $$props;
	let { isVirtualList = false } = $$props;
	let { loadOptionsInterval = 300 } = $$props;
	let { noOptionsMessage = "No options" } = $$props;
	let { hideEmptyState = false } = $$props;
	let { filteredItems = [] } = $$props;
	let { inputAttributes = {} } = $$props;
	let { listAutoWidth = true } = $$props;
	let { itemHeight = 40 } = $$props;
	let { Icon = undefined } = $$props;
	let { iconProps = {} } = $$props;
	let { showChevron = false } = $$props;
	let { showIndicator = false } = $$props;
	let { containerClasses = "" } = $$props;
	let { indicatorSvg = undefined } = $$props;
	let { ClearIcon: ClearIcon$1 = ClearIcon } = $$props;
	let target;
	let activevalue;
	let originalItemsClone;
	let VirtualList;
	let prev_value;
	let prev_filterText;
	let prev_isFocused;
	let prev_filteredItems;

	async function resetFilter() {
		await tick();
		$$invalidate(3, filterText = "");
	}

	let getItemsHasInvoked = false;

	const getItems = debounce(
		async () => {
			getItemsHasInvoked = true;
			$$invalidate(5, isWaiting = true);

			let res = await loadOptions(filterText).catch(err => {
				console.warn("svelte-select loadOptions error :>> ", err);
				dispatch("error", { type: "loadOptions", details: err });
			});

			if (res && !res.cancelled) {
				if (res) {
					$$invalidate(35, items = [...res]);
					dispatch("loaded", { items });
				} else {
					$$invalidate(35, items = []);
				}

				$$invalidate(5, isWaiting = false);
				$$invalidate(1, isFocused = true);
				$$invalidate(36, listOpen = true);
			}
		},
		loadOptionsInterval
	);

	function setvalue() {
		if (typeof value === "string") {
			$$invalidate(2, value = { [optionIdentifier]: value, label: value });
		} else if (isMulti && Array.isArray(value) && value.length > 0) {
			$$invalidate(2, value = value.map(item => typeof item === "string"
			? { value: item, label: item }
			: item));
		}
	}

	let _inputAttributes;

	function assignInputAttributes() {
		$$invalidate(26, _inputAttributes = Object.assign(
			{
				autocomplete: "off",
				autocorrect: "off",
				spellcheck: false
			},
			inputAttributes
		));

		if (!isSearchable) {
			$$invalidate(26, _inputAttributes.readonly = true, _inputAttributes);
		}
	}

	function convertStringItemsToObjects() {
		$$invalidate(35, items = items.map((item, index) => {
			return { index, value: item, label: item };
		}));
	}

	function resetFilteredItems() {
		$$invalidate(38, filteredItems = JSON.parse(originalItemsClone));
	}

	function filterItem(item) {
		let keepItem = true;

		if (isMulti && value) {
			keepItem = !value.some(x => {
				return x[optionIdentifier] === item[optionIdentifier];
			});
		}

		if (!keepItem) return false;
		if (filterText.length < 1) return true;
		return itemFilter(getOptionLabel(item, filterText), filterText, item);
	}

	function setupFilteredItems() {
		$$invalidate(38, filteredItems = loadOptions
		? filterText.length === 0 ? [] : items
		: items.filter(item => filterItem(item)));
	}

	function filterGroupedItems() {
		const groupValues = [];
		const groups = {};

		filteredItems.forEach(item => {
			const groupValue = groupBy(item);

			if (!groupValues.includes(groupValue)) {
				groupValues.push(groupValue);
				groups[groupValue] = [];

				if (groupValue) {
					groups[groupValue].push(Object.assign(createGroupHeaderItem(groupValue, item), {
						id: groupValue,
						isGroupHeader: true,
						isSelectable: isGroupHeaderSelectable
					}));
				}
			}

			groups[groupValue].push(Object.assign({ isGroupItem: !!groupValue }, item));
		});

		const sortedGroupedItems = [];

		groupFilter(groupValues).forEach(groupValue => {
			sortedGroupedItems.push(...groups[groupValue]);
		});

		$$invalidate(38, filteredItems = sortedGroupedItems);
	}

	function dispatchSelectedItem() {
		if (isMulti) {
			if (JSON.stringify(value) !== JSON.stringify(prev_value)) {
				if (checkvalueForDuplicates()) {
					dispatch("select", value);
				}
			}

			return;
		}

		if (!prev_value || JSON.stringify(value[optionIdentifier]) !== JSON.stringify(prev_value[optionIdentifier])) {
			dispatch("select", value);
		}
	}

	function setupFilterText() {
		if (filterText.length > 0) {
			$$invalidate(1, isFocused = true);
			$$invalidate(36, listOpen = true);

			if (loadOptions) {
				getItems();
			} else {
				loadList();
				$$invalidate(36, listOpen = true);

				if (isMulti) {
					$$invalidate(25, activevalue = undefined);
				}
			}
		} else {
			setList([]);
		}

		if (list) {
			list.$set({ filterText });
		}
	}

	function setupFocus() {
		if (isFocused || listOpen) {
			handleFocus();
		} else {
			resetFilter();
			if (input) input.blur();
		}
	}

	let VirtualListComponent;

	async function setupVirtualList() {
		VirtualListComponent = await Promise.resolve().then(function () { return VirtualList$1; });
		VirtualList = VirtualListComponent.default;
	}

	function setupFilteredItem() {
		let _filteredItems = [...filteredItems];

		if (isCreatable && filterText) {
			const itemToCreate = createItem(filterText);
			itemToCreate.isCreator = true;

			const existingItemWithFilterValue = _filteredItems.find(item => {
				return item[optionIdentifier] === itemToCreate[optionIdentifier];
			});

			let existingSelectionWithFilterValue;

			if (value) {
				if (isMulti) {
					existingSelectionWithFilterValue = value.find(selection => {
						return selection[optionIdentifier] === itemToCreate[optionIdentifier];
					});
				} else if (value[optionIdentifier] === itemToCreate[optionIdentifier]) {
					existingSelectionWithFilterValue = value;
				}
			}

			if (!existingItemWithFilterValue && !existingSelectionWithFilterValue) {
				_filteredItems = [..._filteredItems, itemToCreate];
			}
		}

		setList(_filteredItems);
	}

	beforeUpdate(() => {
		prev_value = value;
		$$invalidate(61, prev_filterText = filterText);
		$$invalidate(62, prev_isFocused = isFocused);
		$$invalidate(63, prev_filteredItems = filteredItems);
	});

	function checkvalueForDuplicates() {
		let noDuplicates = true;

		if (value) {
			const ids = [];
			const uniqueValues = [];

			value.forEach(val => {
				if (!ids.includes(val[optionIdentifier])) {
					ids.push(val[optionIdentifier]);
					uniqueValues.push(val);
				} else {
					noDuplicates = false;
				}
			});

			if (!noDuplicates) $$invalidate(2, value = uniqueValues);
		}

		return noDuplicates;
	}

	function findItem(selection) {
		let matchTo = selection
		? selection[optionIdentifier]
		: value[optionIdentifier];

		return items.find(item => item[optionIdentifier] === matchTo);
	}

	function updatevalueDisplay(items) {
		if (!items || items.length === 0 || items.some(item => typeof item !== "object")) return;

		if (!value || (isMulti
		? value.some(selection => !selection || !selection[optionIdentifier])
		: !value[optionIdentifier])) return;

		if (Array.isArray(value)) {
			$$invalidate(2, value = value.map(selection => findItem(selection) || selection));
		} else {
			$$invalidate(2, value = findItem() || value);
		}
	}

	async function setList(items) {
		await tick();
		if (!listOpen) return;
		if (list) return list.$set({ items });
		if (loadOptions && getItemsHasInvoked && items.length > 0) loadList();
	}

	function handleMultiItemClear(event) {
		const { detail } = event;
		const itemToRemove = value[detail ? detail.i : value.length - 1];

		if (value.length === 1) {
			$$invalidate(2, value = undefined);
		} else {
			$$invalidate(2, value = value.filter(item => {
				return item !== itemToRemove;
			}));
		}

		dispatch("clear", itemToRemove);
		getPosition();
	}

	async function getPosition() {
		await tick();
		if (!target || !container) return;
		const { top, height, width } = container.getBoundingClientRect();
		target.style["min-width"] = `${width}px`;
		target.style.width = `${listAutoWidth ? "auto" : "100%"}`;
		target.style.left = "0";

		if (listPlacement === "top") {
			target.style.bottom = `${height + 5}px`;
		} else {
			target.style.top = `${height + 5}px`;
		}

		target = target;

		if (listPlacement === "auto" && isOutOfViewport(target).bottom) {
			target.style.top = ``;
			target.style.bottom = `${height + 5}px`;
		}

		target.style.visibility = "";
	}

	function handleKeyDown(e) {
		if (!isFocused) return;

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				$$invalidate(36, listOpen = true);
				$$invalidate(25, activevalue = undefined);
				break;
			case "ArrowUp":
				e.preventDefault();
				$$invalidate(36, listOpen = true);
				$$invalidate(25, activevalue = undefined);
				break;
			case "Tab":
				if (!listOpen) $$invalidate(1, isFocused = false);
				break;
			case "Backspace":
				if (!isMulti || filterText.length > 0) return;
				if (isMulti && value && value.length > 0) {
					handleMultiItemClear(activevalue !== undefined
					? activevalue
					: value.length - 1);

					if (activevalue === 0 || activevalue === undefined) break;
					$$invalidate(25, activevalue = value.length > activevalue ? activevalue - 1 : undefined);
				}
				break;
			case "ArrowLeft":
				if (list) list.$set({ hoverItemIndex: -1 });
				if (!isMulti || filterText.length > 0) return;
				if (activevalue === undefined) {
					$$invalidate(25, activevalue = value.length - 1);
				} else if (value.length > activevalue && activevalue !== 0) {
					$$invalidate(25, activevalue -= 1);
				}
				break;
			case "ArrowRight":
				if (list) list.$set({ hoverItemIndex: -1 });
				if (!isMulti || filterText.length > 0 || activevalue === undefined) return;
				if (activevalue === value.length - 1) {
					$$invalidate(25, activevalue = undefined);
				} else if (activevalue < value.length - 1) {
					$$invalidate(25, activevalue += 1);
				}
				break;
		}
	}

	function handleFocus() {
		$$invalidate(1, isFocused = true);
		if (input) input.focus();
	}

	function removeList() {
		resetFilter();
		$$invalidate(25, activevalue = undefined);
		if (!list) return;
		list.$destroy();
		$$invalidate(37, list = undefined);
		if (!target) return;
		if (target.parentNode) target.parentNode.removeChild(target);
		target = undefined;
		$$invalidate(37, list);
		target = target;
	}

	function handleWindowClick(event) {
		if (!container) return;

		const eventTarget = event.path && event.path.length > 0
		? event.path[0]
		: event.target;

		if (container.contains(eventTarget)) return;
		$$invalidate(1, isFocused = false);
		$$invalidate(36, listOpen = false);
		$$invalidate(25, activevalue = undefined);
		if (input) input.blur();
	}

	function handleClick() {
		if (isDisabled) return;
		$$invalidate(1, isFocused = true);
		$$invalidate(36, listOpen = !listOpen);
	}

	function handleClear() {
		$$invalidate(2, value = undefined);
		$$invalidate(36, listOpen = false);
		dispatch("clear", value);
		handleFocus();
	}

	async function loadList() {
		await tick();
		if (target && list) return;
		if (isVirtualList && !VirtualListComponent) await setupVirtualList();

		const data = {
			Item: Item$1,
			filterText,
			optionIdentifier,
			noOptionsMessage,
			hideEmptyState,
			isVirtualList,
			VirtualList,
			value,
			isMulti,
			getGroupHeaderLabel,
			items: filteredItems,
			itemHeight
		};

		if (getOptionLabel) {
			data.getOptionLabel = getOptionLabel;
		}

		if (target) target.remove();
		target = document.createElement("div");

		Object.assign(target.style, {
			position: "absolute",
			"z-index": 2,
			visibility: "hidden"
		});

		if (list) list.$destroy();
		$$invalidate(37, list);
		target = target;
		if (container) container.appendChild(target);
		$$invalidate(37, list = new List({ target, props: data }));

		list.$on("itemSelected", event => {
			const { detail } = event;

			if (detail) {
				const item = Object.assign({}, detail);

				if (!item.isGroupHeader || item.isSelectable) {
					if (isMulti) {
						$$invalidate(2, value = value ? value.concat([item]) : [item]);
					} else {
						$$invalidate(2, value = item);
					}

					resetFilter();
					$$invalidate(2, value);

					setTimeout(() => {
						$$invalidate(36, listOpen = false);
						$$invalidate(25, activevalue = undefined);
					});
				}
			}
		});

		list.$on("itemCreated", event => {
			const { detail } = event;

			if (isMulti) {
				$$invalidate(2, value = value || []);
				$$invalidate(2, value = [...value, createItem(detail)]);
			} else {
				$$invalidate(2, value = createItem(detail));
			}

			dispatch("itemCreated", detail);
			$$invalidate(3, filterText = "");
			$$invalidate(36, listOpen = false);
			$$invalidate(25, activevalue = undefined);
			resetFilter();
		});

		list.$on("closeList", () => {
			$$invalidate(36, listOpen = false);
		});

		($$invalidate(37, list), target = target);
		getPosition();
	}

	onMount(() => {
		if (isFocused) input.focus();
		if (listOpen) loadList();

		if (items && items.length > 0) {
			$$invalidate(60, originalItemsClone = JSON.stringify(items));
		}
	});

	onDestroy(() => {
		removeList();
	});

	const writable_props = [
		"container",
		"input",
		"Item",
		"Selection",
		"MultiSelection",
		"isMulti",
		"multiFullItemClearable",
		"isDisabled",
		"isCreatable",
		"isFocused",
		"value",
		"filterText",
		"placeholder",
		"items",
		"itemFilter",
		"groupBy",
		"groupFilter",
		"isGroupHeaderSelectable",
		"getGroupHeaderLabel",
		"getOptionLabel",
		"optionIdentifier",
		"loadOptions",
		"hasError",
		"containerStyles",
		"getSelectionLabel",
		"createGroupHeaderItem",
		"createItem",
		"isSearchable",
		"inputStyles",
		"isClearable",
		"isWaiting",
		"listPlacement",
		"listOpen",
		"list",
		"isVirtualList",
		"loadOptionsInterval",
		"noOptionsMessage",
		"hideEmptyState",
		"filteredItems",
		"inputAttributes",
		"listAutoWidth",
		"itemHeight",
		"Icon",
		"iconProps",
		"showChevron",
		"showIndicator",
		"containerClasses",
		"indicatorSvg",
		"ClearIcon"
	];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Select> was created with unknown prop '${key}'`);
	});

	function input_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			input = $$value;
			$$invalidate(4, input);
		});
	}

	function input_1_input_handler() {
		filterText = this.value;
		$$invalidate(3, filterText);
	}

	function input_1_binding_1($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			input = $$value;
			$$invalidate(4, input);
		});
	}

	function input_1_input_handler_1() {
		filterText = this.value;
		$$invalidate(3, filterText);
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			container = $$value;
			$$invalidate(0, container);
		});
	}

	$$self.$$set = $$props => {
		if ("container" in $$props) $$invalidate(0, container = $$props.container);
		if ("input" in $$props) $$invalidate(4, input = $$props.input);
		if ("Item" in $$props) $$invalidate(39, Item$1 = $$props.Item);
		if ("Selection" in $$props) $$invalidate(6, Selection$1 = $$props.Selection);
		if ("MultiSelection" in $$props) $$invalidate(7, MultiSelection$1 = $$props.MultiSelection);
		if ("isMulti" in $$props) $$invalidate(8, isMulti = $$props.isMulti);
		if ("multiFullItemClearable" in $$props) $$invalidate(9, multiFullItemClearable = $$props.multiFullItemClearable);
		if ("isDisabled" in $$props) $$invalidate(10, isDisabled = $$props.isDisabled);
		if ("isCreatable" in $$props) $$invalidate(40, isCreatable = $$props.isCreatable);
		if ("isFocused" in $$props) $$invalidate(1, isFocused = $$props.isFocused);
		if ("value" in $$props) $$invalidate(2, value = $$props.value);
		if ("filterText" in $$props) $$invalidate(3, filterText = $$props.filterText);
		if ("placeholder" in $$props) $$invalidate(41, placeholder = $$props.placeholder);
		if ("items" in $$props) $$invalidate(35, items = $$props.items);
		if ("itemFilter" in $$props) $$invalidate(42, itemFilter = $$props.itemFilter);
		if ("groupBy" in $$props) $$invalidate(43, groupBy = $$props.groupBy);
		if ("groupFilter" in $$props) $$invalidate(44, groupFilter = $$props.groupFilter);
		if ("isGroupHeaderSelectable" in $$props) $$invalidate(45, isGroupHeaderSelectable = $$props.isGroupHeaderSelectable);
		if ("getGroupHeaderLabel" in $$props) $$invalidate(46, getGroupHeaderLabel = $$props.getGroupHeaderLabel);
		if ("getOptionLabel" in $$props) $$invalidate(47, getOptionLabel = $$props.getOptionLabel);
		if ("optionIdentifier" in $$props) $$invalidate(48, optionIdentifier = $$props.optionIdentifier);
		if ("loadOptions" in $$props) $$invalidate(49, loadOptions = $$props.loadOptions);
		if ("hasError" in $$props) $$invalidate(11, hasError = $$props.hasError);
		if ("containerStyles" in $$props) $$invalidate(12, containerStyles = $$props.containerStyles);
		if ("getSelectionLabel" in $$props) $$invalidate(13, getSelectionLabel = $$props.getSelectionLabel);
		if ("createGroupHeaderItem" in $$props) $$invalidate(50, createGroupHeaderItem = $$props.createGroupHeaderItem);
		if ("createItem" in $$props) $$invalidate(51, createItem = $$props.createItem);
		if ("isSearchable" in $$props) $$invalidate(14, isSearchable = $$props.isSearchable);
		if ("inputStyles" in $$props) $$invalidate(15, inputStyles = $$props.inputStyles);
		if ("isClearable" in $$props) $$invalidate(16, isClearable = $$props.isClearable);
		if ("isWaiting" in $$props) $$invalidate(5, isWaiting = $$props.isWaiting);
		if ("listPlacement" in $$props) $$invalidate(52, listPlacement = $$props.listPlacement);
		if ("listOpen" in $$props) $$invalidate(36, listOpen = $$props.listOpen);
		if ("list" in $$props) $$invalidate(37, list = $$props.list);
		if ("isVirtualList" in $$props) $$invalidate(53, isVirtualList = $$props.isVirtualList);
		if ("loadOptionsInterval" in $$props) $$invalidate(54, loadOptionsInterval = $$props.loadOptionsInterval);
		if ("noOptionsMessage" in $$props) $$invalidate(55, noOptionsMessage = $$props.noOptionsMessage);
		if ("hideEmptyState" in $$props) $$invalidate(56, hideEmptyState = $$props.hideEmptyState);
		if ("filteredItems" in $$props) $$invalidate(38, filteredItems = $$props.filteredItems);
		if ("inputAttributes" in $$props) $$invalidate(57, inputAttributes = $$props.inputAttributes);
		if ("listAutoWidth" in $$props) $$invalidate(58, listAutoWidth = $$props.listAutoWidth);
		if ("itemHeight" in $$props) $$invalidate(59, itemHeight = $$props.itemHeight);
		if ("Icon" in $$props) $$invalidate(17, Icon = $$props.Icon);
		if ("iconProps" in $$props) $$invalidate(18, iconProps = $$props.iconProps);
		if ("showChevron" in $$props) $$invalidate(19, showChevron = $$props.showChevron);
		if ("showIndicator" in $$props) $$invalidate(20, showIndicator = $$props.showIndicator);
		if ("containerClasses" in $$props) $$invalidate(21, containerClasses = $$props.containerClasses);
		if ("indicatorSvg" in $$props) $$invalidate(22, indicatorSvg = $$props.indicatorSvg);
		if ("ClearIcon" in $$props) $$invalidate(23, ClearIcon$1 = $$props.ClearIcon);
	};

	$$self.$capture_state = () => ({
		beforeUpdate,
		createEventDispatcher,
		onDestroy,
		onMount,
		tick,
		List,
		ItemComponent: Item,
		SelectionComponent: Selection,
		MultiSelectionComponent: MultiSelection,
		isOutOfViewport,
		debounce,
		DefaultClearIcon: ClearIcon,
		dispatch,
		container,
		input,
		Item: Item$1,
		Selection: Selection$1,
		MultiSelection: MultiSelection$1,
		isMulti,
		multiFullItemClearable,
		isDisabled,
		isCreatable,
		isFocused,
		value,
		filterText,
		placeholder,
		items,
		itemFilter,
		groupBy,
		groupFilter,
		isGroupHeaderSelectable,
		getGroupHeaderLabel,
		getOptionLabel,
		optionIdentifier,
		loadOptions,
		hasError,
		containerStyles,
		getSelectionLabel,
		createGroupHeaderItem,
		createItem,
		isSearchable,
		inputStyles,
		isClearable,
		isWaiting,
		listPlacement,
		listOpen,
		list,
		isVirtualList,
		loadOptionsInterval,
		noOptionsMessage,
		hideEmptyState,
		filteredItems,
		inputAttributes,
		listAutoWidth,
		itemHeight,
		Icon,
		iconProps,
		showChevron,
		showIndicator,
		containerClasses,
		indicatorSvg,
		ClearIcon: ClearIcon$1,
		target,
		activevalue,
		originalItemsClone,
		VirtualList,
		prev_value,
		prev_filterText,
		prev_isFocused,
		prev_filteredItems,
		resetFilter,
		getItemsHasInvoked,
		getItems,
		setvalue,
		_inputAttributes,
		assignInputAttributes,
		convertStringItemsToObjects,
		resetFilteredItems,
		filterItem,
		setupFilteredItems,
		filterGroupedItems,
		dispatchSelectedItem,
		setupFilterText,
		setupFocus,
		VirtualListComponent,
		setupVirtualList,
		setupFilteredItem,
		checkvalueForDuplicates,
		findItem,
		updatevalueDisplay,
		setList,
		handleMultiItemClear,
		getPosition,
		handleKeyDown,
		handleFocus,
		removeList,
		handleWindowClick,
		handleClick,
		handleClear,
		loadList,
		showSelectedItem,
		placeholderText
	});

	$$self.$inject_state = $$props => {
		if ("container" in $$props) $$invalidate(0, container = $$props.container);
		if ("input" in $$props) $$invalidate(4, input = $$props.input);
		if ("Item" in $$props) $$invalidate(39, Item$1 = $$props.Item);
		if ("Selection" in $$props) $$invalidate(6, Selection$1 = $$props.Selection);
		if ("MultiSelection" in $$props) $$invalidate(7, MultiSelection$1 = $$props.MultiSelection);
		if ("isMulti" in $$props) $$invalidate(8, isMulti = $$props.isMulti);
		if ("multiFullItemClearable" in $$props) $$invalidate(9, multiFullItemClearable = $$props.multiFullItemClearable);
		if ("isDisabled" in $$props) $$invalidate(10, isDisabled = $$props.isDisabled);
		if ("isCreatable" in $$props) $$invalidate(40, isCreatable = $$props.isCreatable);
		if ("isFocused" in $$props) $$invalidate(1, isFocused = $$props.isFocused);
		if ("value" in $$props) $$invalidate(2, value = $$props.value);
		if ("filterText" in $$props) $$invalidate(3, filterText = $$props.filterText);
		if ("placeholder" in $$props) $$invalidate(41, placeholder = $$props.placeholder);
		if ("items" in $$props) $$invalidate(35, items = $$props.items);
		if ("itemFilter" in $$props) $$invalidate(42, itemFilter = $$props.itemFilter);
		if ("groupBy" in $$props) $$invalidate(43, groupBy = $$props.groupBy);
		if ("groupFilter" in $$props) $$invalidate(44, groupFilter = $$props.groupFilter);
		if ("isGroupHeaderSelectable" in $$props) $$invalidate(45, isGroupHeaderSelectable = $$props.isGroupHeaderSelectable);
		if ("getGroupHeaderLabel" in $$props) $$invalidate(46, getGroupHeaderLabel = $$props.getGroupHeaderLabel);
		if ("getOptionLabel" in $$props) $$invalidate(47, getOptionLabel = $$props.getOptionLabel);
		if ("optionIdentifier" in $$props) $$invalidate(48, optionIdentifier = $$props.optionIdentifier);
		if ("loadOptions" in $$props) $$invalidate(49, loadOptions = $$props.loadOptions);
		if ("hasError" in $$props) $$invalidate(11, hasError = $$props.hasError);
		if ("containerStyles" in $$props) $$invalidate(12, containerStyles = $$props.containerStyles);
		if ("getSelectionLabel" in $$props) $$invalidate(13, getSelectionLabel = $$props.getSelectionLabel);
		if ("createGroupHeaderItem" in $$props) $$invalidate(50, createGroupHeaderItem = $$props.createGroupHeaderItem);
		if ("createItem" in $$props) $$invalidate(51, createItem = $$props.createItem);
		if ("isSearchable" in $$props) $$invalidate(14, isSearchable = $$props.isSearchable);
		if ("inputStyles" in $$props) $$invalidate(15, inputStyles = $$props.inputStyles);
		if ("isClearable" in $$props) $$invalidate(16, isClearable = $$props.isClearable);
		if ("isWaiting" in $$props) $$invalidate(5, isWaiting = $$props.isWaiting);
		if ("listPlacement" in $$props) $$invalidate(52, listPlacement = $$props.listPlacement);
		if ("listOpen" in $$props) $$invalidate(36, listOpen = $$props.listOpen);
		if ("list" in $$props) $$invalidate(37, list = $$props.list);
		if ("isVirtualList" in $$props) $$invalidate(53, isVirtualList = $$props.isVirtualList);
		if ("loadOptionsInterval" in $$props) $$invalidate(54, loadOptionsInterval = $$props.loadOptionsInterval);
		if ("noOptionsMessage" in $$props) $$invalidate(55, noOptionsMessage = $$props.noOptionsMessage);
		if ("hideEmptyState" in $$props) $$invalidate(56, hideEmptyState = $$props.hideEmptyState);
		if ("filteredItems" in $$props) $$invalidate(38, filteredItems = $$props.filteredItems);
		if ("inputAttributes" in $$props) $$invalidate(57, inputAttributes = $$props.inputAttributes);
		if ("listAutoWidth" in $$props) $$invalidate(58, listAutoWidth = $$props.listAutoWidth);
		if ("itemHeight" in $$props) $$invalidate(59, itemHeight = $$props.itemHeight);
		if ("Icon" in $$props) $$invalidate(17, Icon = $$props.Icon);
		if ("iconProps" in $$props) $$invalidate(18, iconProps = $$props.iconProps);
		if ("showChevron" in $$props) $$invalidate(19, showChevron = $$props.showChevron);
		if ("showIndicator" in $$props) $$invalidate(20, showIndicator = $$props.showIndicator);
		if ("containerClasses" in $$props) $$invalidate(21, containerClasses = $$props.containerClasses);
		if ("indicatorSvg" in $$props) $$invalidate(22, indicatorSvg = $$props.indicatorSvg);
		if ("ClearIcon" in $$props) $$invalidate(23, ClearIcon$1 = $$props.ClearIcon);
		if ("target" in $$props) target = $$props.target;
		if ("activevalue" in $$props) $$invalidate(25, activevalue = $$props.activevalue);
		if ("originalItemsClone" in $$props) $$invalidate(60, originalItemsClone = $$props.originalItemsClone);
		if ("VirtualList" in $$props) VirtualList = $$props.VirtualList;
		if ("prev_value" in $$props) prev_value = $$props.prev_value;
		if ("prev_filterText" in $$props) $$invalidate(61, prev_filterText = $$props.prev_filterText);
		if ("prev_isFocused" in $$props) $$invalidate(62, prev_isFocused = $$props.prev_isFocused);
		if ("prev_filteredItems" in $$props) $$invalidate(63, prev_filteredItems = $$props.prev_filteredItems);
		if ("getItemsHasInvoked" in $$props) getItemsHasInvoked = $$props.getItemsHasInvoked;
		if ("_inputAttributes" in $$props) $$invalidate(26, _inputAttributes = $$props._inputAttributes);
		if ("VirtualListComponent" in $$props) VirtualListComponent = $$props.VirtualListComponent;
		if ("showSelectedItem" in $$props) $$invalidate(27, showSelectedItem = $$props.showSelectedItem);
		if ("placeholderText" in $$props) $$invalidate(28, placeholderText = $$props.placeholderText);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[1] & /*items*/ 16) {
			updatevalueDisplay(items);
		}

		if ($$self.$$.dirty[0] & /*value*/ 4) {
			{
				if (value) setvalue();
			}
		}

		if ($$self.$$.dirty[1] & /*noOptionsMessage, list*/ 16777280) {
			{
				if (noOptionsMessage && list) list.$set({ noOptionsMessage });
			}
		}

		if ($$self.$$.dirty[0] & /*isSearchable*/ 16384 | $$self.$$.dirty[1] & /*inputAttributes*/ 67108864) {
			{
				if (inputAttributes || !isSearchable) assignInputAttributes();
			}
		}

		if ($$self.$$.dirty[0] & /*filterText*/ 8 | $$self.$$.dirty[1] & /*items, loadOptions, originalItemsClone, groupBy*/ 537137168) {
			{
				if (items && items.length > 0 && typeof items[0] !== "object") {
					convertStringItemsToObjects();
				}

				if (loadOptions && filterText.length === 0 && originalItemsClone) {
					resetFilteredItems();
				} else {
					setupFilteredItems();
				}

				if (groupBy) {
					filterGroupedItems();
				}
			}
		}

		if ($$self.$$.dirty[0] & /*isMulti, value*/ 260) {
			{
				if (isMulti && value && value.length > 1) {
					checkvalueForDuplicates();
				}
			}
		}

		if ($$self.$$.dirty[0] & /*value*/ 4) {
			{
				if (value) {
					dispatchSelectedItem();
				}
			}
		}

		if ($$self.$$.dirty[0] & /*container*/ 1 | $$self.$$.dirty[1] & /*listOpen*/ 32) {
			{
				if (container) {
					if (listOpen) {
						loadList();
					} else {
						removeList();
					}
				}
			}
		}

		if ($$self.$$.dirty[0] & /*isFocused*/ 2 | $$self.$$.dirty[2] & /*prev_isFocused*/ 1) {
			{
				if (isFocused !== prev_isFocused) {
					setupFocus();
				}
			}
		}

		if ($$self.$$.dirty[0] & /*filterText*/ 8 | $$self.$$.dirty[1] & /*prev_filterText*/ 1073741824) {
			{
				if (filterText !== prev_filterText) {
					setupFilterText();
				}
			}
		}

		if ($$self.$$.dirty[1] & /*filteredItems*/ 128 | $$self.$$.dirty[2] & /*prev_filteredItems*/ 2) {
			{
				if (prev_filteredItems !== filteredItems) {
					setupFilteredItem();
				}
			}
		}

		if ($$self.$$.dirty[0] & /*value, filterText*/ 12) {
			$$invalidate(27, showSelectedItem = value && filterText.length === 0);
		}

		if ($$self.$$.dirty[0] & /*value*/ 4 | $$self.$$.dirty[1] & /*placeholder*/ 1024) {
			$$invalidate(28, placeholderText = value ? "" : placeholder);
		}
	};

	return [
		container,
		isFocused,
		value,
		filterText,
		input,
		isWaiting,
		Selection$1,
		MultiSelection$1,
		isMulti,
		multiFullItemClearable,
		isDisabled,
		hasError,
		containerStyles,
		getSelectionLabel,
		isSearchable,
		inputStyles,
		isClearable,
		Icon,
		iconProps,
		showChevron,
		showIndicator,
		containerClasses,
		indicatorSvg,
		ClearIcon$1,
		handleClear,
		activevalue,
		_inputAttributes,
		showSelectedItem,
		placeholderText,
		handleMultiItemClear,
		getPosition,
		handleKeyDown,
		handleFocus,
		handleWindowClick,
		handleClick,
		items,
		listOpen,
		list,
		filteredItems,
		Item$1,
		isCreatable,
		placeholder,
		itemFilter,
		groupBy,
		groupFilter,
		isGroupHeaderSelectable,
		getGroupHeaderLabel,
		getOptionLabel,
		optionIdentifier,
		loadOptions,
		createGroupHeaderItem,
		createItem,
		listPlacement,
		isVirtualList,
		loadOptionsInterval,
		noOptionsMessage,
		hideEmptyState,
		inputAttributes,
		listAutoWidth,
		itemHeight,
		originalItemsClone,
		prev_filterText,
		prev_isFocused,
		prev_filteredItems,
		input_1_binding,
		input_1_input_handler,
		input_1_binding_1,
		input_1_input_handler_1,
		div_binding
	];
}

class Select extends SvelteComponentDev {
	constructor(options) {
		super(options);
		if (!document_1.getElementById("svelte-1ri8kk0-style")) add_css$3();

		init(
			this,
			options,
			instance$7,
			create_fragment$7,
			safe_not_equal,
			{
				container: 0,
				input: 4,
				Item: 39,
				Selection: 6,
				MultiSelection: 7,
				isMulti: 8,
				multiFullItemClearable: 9,
				isDisabled: 10,
				isCreatable: 40,
				isFocused: 1,
				value: 2,
				filterText: 3,
				placeholder: 41,
				items: 35,
				itemFilter: 42,
				groupBy: 43,
				groupFilter: 44,
				isGroupHeaderSelectable: 45,
				getGroupHeaderLabel: 46,
				getOptionLabel: 47,
				optionIdentifier: 48,
				loadOptions: 49,
				hasError: 11,
				containerStyles: 12,
				getSelectionLabel: 13,
				createGroupHeaderItem: 50,
				createItem: 51,
				isSearchable: 14,
				inputStyles: 15,
				isClearable: 16,
				isWaiting: 5,
				listPlacement: 52,
				listOpen: 36,
				list: 37,
				isVirtualList: 53,
				loadOptionsInterval: 54,
				noOptionsMessage: 55,
				hideEmptyState: 56,
				filteredItems: 38,
				inputAttributes: 57,
				listAutoWidth: 58,
				itemHeight: 59,
				Icon: 17,
				iconProps: 18,
				showChevron: 19,
				showIndicator: 20,
				containerClasses: 21,
				indicatorSvg: 22,
				ClearIcon: 23,
				handleClear: 24
			},
			[-1, -1, -1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select",
			options,
			id: create_fragment$7.name
		});
	}

	get container() {
		return this.$$.ctx[0];
	}

	set container(container) {
		this.$set({ container });
		flush();
	}

	get input() {
		return this.$$.ctx[4];
	}

	set input(input) {
		this.$set({ input });
		flush();
	}

	get Item() {
		return this.$$.ctx[39];
	}

	set Item(Item) {
		this.$set({ Item });
		flush();
	}

	get Selection() {
		return this.$$.ctx[6];
	}

	set Selection(Selection) {
		this.$set({ Selection });
		flush();
	}

	get MultiSelection() {
		return this.$$.ctx[7];
	}

	set MultiSelection(MultiSelection) {
		this.$set({ MultiSelection });
		flush();
	}

	get isMulti() {
		return this.$$.ctx[8];
	}

	set isMulti(isMulti) {
		this.$set({ isMulti });
		flush();
	}

	get multiFullItemClearable() {
		return this.$$.ctx[9];
	}

	set multiFullItemClearable(multiFullItemClearable) {
		this.$set({ multiFullItemClearable });
		flush();
	}

	get isDisabled() {
		return this.$$.ctx[10];
	}

	set isDisabled(isDisabled) {
		this.$set({ isDisabled });
		flush();
	}

	get isCreatable() {
		return this.$$.ctx[40];
	}

	set isCreatable(isCreatable) {
		this.$set({ isCreatable });
		flush();
	}

	get isFocused() {
		return this.$$.ctx[1];
	}

	set isFocused(isFocused) {
		this.$set({ isFocused });
		flush();
	}

	get value() {
		return this.$$.ctx[2];
	}

	set value(value) {
		this.$set({ value });
		flush();
	}

	get filterText() {
		return this.$$.ctx[3];
	}

	set filterText(filterText) {
		this.$set({ filterText });
		flush();
	}

	get placeholder() {
		return this.$$.ctx[41];
	}

	set placeholder(placeholder) {
		this.$set({ placeholder });
		flush();
	}

	get items() {
		return this.$$.ctx[35];
	}

	set items(items) {
		this.$set({ items });
		flush();
	}

	get itemFilter() {
		return this.$$.ctx[42];
	}

	set itemFilter(itemFilter) {
		this.$set({ itemFilter });
		flush();
	}

	get groupBy() {
		return this.$$.ctx[43];
	}

	set groupBy(groupBy) {
		this.$set({ groupBy });
		flush();
	}

	get groupFilter() {
		return this.$$.ctx[44];
	}

	set groupFilter(groupFilter) {
		this.$set({ groupFilter });
		flush();
	}

	get isGroupHeaderSelectable() {
		return this.$$.ctx[45];
	}

	set isGroupHeaderSelectable(isGroupHeaderSelectable) {
		this.$set({ isGroupHeaderSelectable });
		flush();
	}

	get getGroupHeaderLabel() {
		return this.$$.ctx[46];
	}

	set getGroupHeaderLabel(getGroupHeaderLabel) {
		this.$set({ getGroupHeaderLabel });
		flush();
	}

	get getOptionLabel() {
		return this.$$.ctx[47];
	}

	set getOptionLabel(getOptionLabel) {
		this.$set({ getOptionLabel });
		flush();
	}

	get optionIdentifier() {
		return this.$$.ctx[48];
	}

	set optionIdentifier(optionIdentifier) {
		this.$set({ optionIdentifier });
		flush();
	}

	get loadOptions() {
		return this.$$.ctx[49];
	}

	set loadOptions(loadOptions) {
		this.$set({ loadOptions });
		flush();
	}

	get hasError() {
		return this.$$.ctx[11];
	}

	set hasError(hasError) {
		this.$set({ hasError });
		flush();
	}

	get containerStyles() {
		return this.$$.ctx[12];
	}

	set containerStyles(containerStyles) {
		this.$set({ containerStyles });
		flush();
	}

	get getSelectionLabel() {
		return this.$$.ctx[13];
	}

	set getSelectionLabel(getSelectionLabel) {
		this.$set({ getSelectionLabel });
		flush();
	}

	get createGroupHeaderItem() {
		return this.$$.ctx[50];
	}

	set createGroupHeaderItem(createGroupHeaderItem) {
		this.$set({ createGroupHeaderItem });
		flush();
	}

	get createItem() {
		return this.$$.ctx[51];
	}

	set createItem(createItem) {
		this.$set({ createItem });
		flush();
	}

	get isSearchable() {
		return this.$$.ctx[14];
	}

	set isSearchable(isSearchable) {
		this.$set({ isSearchable });
		flush();
	}

	get inputStyles() {
		return this.$$.ctx[15];
	}

	set inputStyles(inputStyles) {
		this.$set({ inputStyles });
		flush();
	}

	get isClearable() {
		return this.$$.ctx[16];
	}

	set isClearable(isClearable) {
		this.$set({ isClearable });
		flush();
	}

	get isWaiting() {
		return this.$$.ctx[5];
	}

	set isWaiting(isWaiting) {
		this.$set({ isWaiting });
		flush();
	}

	get listPlacement() {
		return this.$$.ctx[52];
	}

	set listPlacement(listPlacement) {
		this.$set({ listPlacement });
		flush();
	}

	get listOpen() {
		return this.$$.ctx[36];
	}

	set listOpen(listOpen) {
		this.$set({ listOpen });
		flush();
	}

	get list() {
		return this.$$.ctx[37];
	}

	set list(list) {
		this.$set({ list });
		flush();
	}

	get isVirtualList() {
		return this.$$.ctx[53];
	}

	set isVirtualList(isVirtualList) {
		this.$set({ isVirtualList });
		flush();
	}

	get loadOptionsInterval() {
		return this.$$.ctx[54];
	}

	set loadOptionsInterval(loadOptionsInterval) {
		this.$set({ loadOptionsInterval });
		flush();
	}

	get noOptionsMessage() {
		return this.$$.ctx[55];
	}

	set noOptionsMessage(noOptionsMessage) {
		this.$set({ noOptionsMessage });
		flush();
	}

	get hideEmptyState() {
		return this.$$.ctx[56];
	}

	set hideEmptyState(hideEmptyState) {
		this.$set({ hideEmptyState });
		flush();
	}

	get filteredItems() {
		return this.$$.ctx[38];
	}

	set filteredItems(filteredItems) {
		this.$set({ filteredItems });
		flush();
	}

	get inputAttributes() {
		return this.$$.ctx[57];
	}

	set inputAttributes(inputAttributes) {
		this.$set({ inputAttributes });
		flush();
	}

	get listAutoWidth() {
		return this.$$.ctx[58];
	}

	set listAutoWidth(listAutoWidth) {
		this.$set({ listAutoWidth });
		flush();
	}

	get itemHeight() {
		return this.$$.ctx[59];
	}

	set itemHeight(itemHeight) {
		this.$set({ itemHeight });
		flush();
	}

	get Icon() {
		return this.$$.ctx[17];
	}

	set Icon(Icon) {
		this.$set({ Icon });
		flush();
	}

	get iconProps() {
		return this.$$.ctx[18];
	}

	set iconProps(iconProps) {
		this.$set({ iconProps });
		flush();
	}

	get showChevron() {
		return this.$$.ctx[19];
	}

	set showChevron(showChevron) {
		this.$set({ showChevron });
		flush();
	}

	get showIndicator() {
		return this.$$.ctx[20];
	}

	set showIndicator(showIndicator) {
		this.$set({ showIndicator });
		flush();
	}

	get containerClasses() {
		return this.$$.ctx[21];
	}

	set containerClasses(containerClasses) {
		this.$set({ containerClasses });
		flush();
	}

	get indicatorSvg() {
		return this.$$.ctx[22];
	}

	set indicatorSvg(indicatorSvg) {
		this.$set({ indicatorSvg });
		flush();
	}

	get ClearIcon() {
		return this.$$.ctx[23];
	}

	set ClearIcon(ClearIcon) {
		this.$set({ ClearIcon });
		flush();
	}

	get handleClear() {
		return this.$$.ctx[24];
	}

	set handleClear(value) {
		throw new Error("<Select>: Cannot set read-only property 'handleClear'");
	}
}

/* test/src/TestIcon.svelte generated by Svelte v3.35.0 */

const file$6 = "test/src/TestIcon.svelte";

function create_fragment$6(ctx) {
	let svg;
	let path;

	const block = {
		c: function create() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "d", "M11.0526 0.294881L9.28328 2.06416L13.9577 6.71672L15.7051 4.94744C16.0983\n    4.55427 16.0983 4.00819 15.7051 3.61502L12.4068 0.294881C11.9918 -0.0982935\n    11.4457 -0.0982935 11.0526 0.294881ZM2.11877 11.2164L1.66007 13.4881L2.51195\n    14.3618L4.78362 13.8812L2.11877 11.2164ZM0 15.5631L1.11399 10.2116L8.51877\n    2.80683L13.1932 7.45939L5.76655 14.8642L0.371331 15.9563C0.349488 15.9782\n    0.327645 15.9782 0.305802 15.9782C0.174744 15.9782 0 15.8471 0 15.5631Z");
			attr_dev(path, "fill", "currentColor");
			add_location(path, file$6, 6, 2, 110);
			attr_dev(svg, "id", "testIcon");
			attr_dev(svg, "width", "16");
			attr_dev(svg, "height", "16");
			attr_dev(svg, "viewBox", "0 0 16 16");
			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
			add_location(svg, file$6, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, path);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$6($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("TestIcon", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TestIcon> was created with unknown prop '${key}'`);
	});

	return [];
}

class TestIcon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TestIcon",
			options,
			id: create_fragment$6.name
		});
	}
}

/* test/src/TestClearIcon.svelte generated by Svelte v3.35.0 */

const file$5 = "test/src/TestClearIcon.svelte";

function create_fragment$5(ctx) {
	let svg;
	let path;

	const block = {
		c: function create() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "d", "m437 75c-100-100-262-100-362 0-100 100-100 262 0 362 100 100 262 100 362 0 100-100 100-262 0-362z m-86 274c-1 1-1 1 0 0-5 4-10 6-15 7-6 0-11-2-15-6l-65-65-65 65c-4 4-9 6-15 6-5 0-10-2-14-6-8-8-8-21-1-29 0 0 0 0 1 0l65-65-65-65c-8-8-8-21 0-29 8-8 21-8 29 0l65 65 65-65c8-8 21-8 29 0 8 8 8 21 0 29l-65 65 65 65c8 8 8 21 1 28z");
			attr_dev(path, "fill", "currentColor");
			add_location(path, file$5, 0, 76, 76);
			attr_dev(svg, "class", "testClearIcon");
			attr_dev(svg, "width", "100%");
			attr_dev(svg, "height", "100%");
			attr_dev(svg, "viewBox", "0 0 512 512");
			add_location(svg, file$5, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, svg, anchor);
			append_dev(svg, path);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(svg);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$5($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("TestClearIcon", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TestClearIcon> was created with unknown prop '${key}'`);
	});

	return [];
}

class TestClearIcon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TestClearIcon",
			options,
			id: create_fragment$5.name
		});
	}
}

/* test/src/Select/Select--default.svelte generated by Svelte v3.35.0 */

const file$4 = "test/src/Select/Select--default.svelte";

function create_fragment$4(ctx) {
	let div;
	let input;

	const block = {
		c: function create() {
			div = element("div");
			input = element("input");
			attr_dev(input, "autocomplete", "off");
			attr_dev(input, "autocorrect", "off");
			attr_dev(input, "spellcheck", false);
			attr_dev(input, "placeholder", "Select...");
			add_location(input, file$4, 1, 2, 32);
			attr_dev(div, "class", "selectContainer");
			add_location(div, file$4, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, input);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Select_default", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Select_default> was created with unknown prop '${key}'`);
	});

	return [];
}

class Select_default extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_default",
			options,
			id: create_fragment$4.name
		});
	}
}

/* test/src/Select/Select--multiSelected.svelte generated by Svelte v3.35.0 */

const file$3 = "test/src/Select/Select--multiSelected.svelte";

function add_css$2() {
	var style = element("style");
	style.id = "svelte-1i6xooq-style";
	style.textContent = ".selectContainer.svelte-1i6xooq.svelte-1i6xooq{border:1px solid #D8DBDF;border-radius:3px;height:42px;position:relative}.selectContainer.svelte-1i6xooq input.svelte-1i6xooq{border:none;color:#3F4F5F;height:42px;line-height:42px;padding:0 16px;width:100%;background:transparent;font-size:14px;letter-spacing:-0.08px}.selectContainer.svelte-1i6xooq input.svelte-1i6xooq::placeholder{color:#78848F}.selectContainer.svelte-1i6xooq.svelte-1i6xooq:hover{border-color:#b2b8bf}.selectContainer.svelte-1i6xooq input.svelte-1i6xooq:focus{outline:none}.clearSelect.svelte-1i6xooq.svelte-1i6xooq{position:absolute;right:10px;top:12px;width:20px;height:20px;color:#c5cacf}.clearSelect.svelte-1i6xooq.svelte-1i6xooq:hover{color:#2c3e50}.multiSelect.svelte-1i6xooq.svelte-1i6xooq{display:flex;padding:0 16px}.multiSelectItem.svelte-1i6xooq.svelte-1i6xooq{background:#E8EAED;margin-right:5px;border-radius:4px;line-height:26px;display:flex;cursor:default}.multiSelectItem_label.svelte-1i6xooq.svelte-1i6xooq{padding:0 5px 0 10px}.selectContainer.multiSelect.svelte-1i6xooq input.svelte-1i6xooq{width:auto;padding:0;flex-grow:1}.multiSelectItem_clear.svelte-1i6xooq.svelte-1i6xooq{border-radius:0 4px 4px 0;width:20px;text-align:center}.multiSelectItem_clear.svelte-1i6xooq.svelte-1i6xooq:hover{background-color:red}.multiSelectItem_clear.svelte-1i6xooq svg.svelte-1i6xooq{width:14px;height:14px;position:relative;top:3px}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0LS1tdWx0aVNlbGVjdGVkLnN2ZWx0ZSIsInNvdXJjZXMiOlsiU2VsZWN0LS1tdWx0aVNlbGVjdGVkLnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8IS0tIERFViBPTkxZIElNUE9SVFMgLS0+XG48bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi4uL3Jlc2V0LmNzc1wiLz5cblxuPGRpdiBjbGFzcz1cInNlbGVjdENvbnRhaW5lciBtdWx0aVNlbGVjdFwiPlxuICAgIDxkaXYgY2xhc3M9XCJtdWx0aVNlbGVjdEl0ZW1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtdWx0aVNlbGVjdEl0ZW1fbGFiZWxcIj5cbiAgICAgICAgUGl6emFcbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm11bHRpU2VsZWN0SXRlbV9jbGVhclwiPlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiLTIgLTIgNTAgNTBcIiBmb2N1c2FibGU9XCJmYWxzZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgZD1cIk0zNC45MjMsMzcuMjUxTDI0LDI2LjMyOEwxMy4wNzcsMzcuMjUxTDkuNDM2LDMzLjYxbDEwLjkyMy0xMC45MjNMOS40MzYsMTEuNzY1bDMuNjQxLTMuNjQxTDI0LDE5LjA0N0wzNC45MjMsOC4xMjQgbDMuNjQxLDMuNjQxTDI3LjY0MSwyMi42ODhMMzguNTY0LDMzLjYxTDM0LjkyMywzNy4yNTF6XCI+PC9wYXRoPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtdWx0aVNlbGVjdEl0ZW1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtdWx0aVNlbGVjdEl0ZW1fbGFiZWxcIj5cbiAgICAgICAgQ2hpcHNcbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm11bHRpU2VsZWN0SXRlbV9jbGVhclwiPlxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiLTIgLTIgNTAgNTBcIiBmb2N1c2FibGU9XCJmYWxzZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgZD1cIk0zNC45MjMsMzcuMjUxTDI0LDI2LjMyOEwxMy4wNzcsMzcuMjUxTDkuNDM2LDMzLjYxbDEwLjkyMy0xMC45MjNMOS40MzYsMTEuNzY1bDMuNjQxLTMuNjQxTDI0LDE5LjA0N0wzNC45MjMsOC4xMjQgbDMuNjQxLDMuNjQxTDI3LjY0MSwyMi42ODhMMzguNTY0LDMzLjYxTDM0LjkyMywzNy4yNTF6XCI+PC9wYXRoPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8aW5wdXQgYXV0b2NvbXBsZXRlPVwib2ZmXCIgYXV0b2NvcnJlY3Q9XCJvZmZcIiBzcGVsbGNoZWNrPVwidHJ1ZVwiIHBsYWNlaG9sZGVyPVwiXCI+XG4gIDxkaXYgY2xhc3M9XCJjbGVhclNlbGVjdFwiPlxuICAgIDxzdmcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCItMiAtMiA1MCA1MFwiIGZvY3VzYWJsZT1cImZhbHNlXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPlxuICAgICAgPHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICBkPVwiTTM0LjkyMywzNy4yNTFMMjQsMjYuMzI4TDEzLjA3NywzNy4yNTFMOS40MzYsMzMuNjFsMTAuOTIzLTEwLjkyM0w5LjQzNiwxMS43NjVsMy42NDEtMy42NDFMMjQsMTkuMDQ3TDM0LjkyMyw4LjEyNCBsMy42NDEsMy42NDFMMjcuNjQxLDIyLjY4OEwzOC41NjQsMzMuNjFMMzQuOTIzLDM3LjI1MXpcIj48L3BhdGg+XG4gICAgPC9zdmc+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjxzdHlsZT5cbiAgLnNlbGVjdENvbnRhaW5lciB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI0Q4REJERjtcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgaGVpZ2h0OiA0MnB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuXG4gIC5zZWxlY3RDb250YWluZXIgaW5wdXQge1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBjb2xvcjogIzNGNEY1RjtcbiAgICBoZWlnaHQ6IDQycHg7XG4gICAgbGluZS1oZWlnaHQ6IDQycHg7XG4gICAgcGFkZGluZzogMCAxNnB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBsZXR0ZXItc3BhY2luZzogLTAuMDhweDtcbiAgfVxuXG4gIC5zZWxlY3RDb250YWluZXIgaW5wdXQ6OnBsYWNlaG9sZGVyIHtcbiAgICBjb2xvcjogIzc4ODQ4RjtcbiAgfVxuXG4gIC5zZWxlY3RDb250YWluZXI6aG92ZXIge1xuICAgIGJvcmRlci1jb2xvcjogI2IyYjhiZjtcbiAgfVxuXG4gIC5zZWxlY3RDb250YWluZXIgaW5wdXQ6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cblxuICAuY2xlYXJTZWxlY3Qge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogMTBweDtcbiAgICB0b3A6IDEycHg7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIGNvbG9yOiAjYzVjYWNmO1xuICB9XG5cbiAgLmNsZWFyU2VsZWN0OmhvdmVyIHtcbiAgICBjb2xvcjogIzJjM2U1MDtcbiAgfVxuXG4gIC5tdWx0aVNlbGVjdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBwYWRkaW5nOiAwIDE2cHg7XG4gIH1cbiAgXG4gIC5tdWx0aVNlbGVjdEl0ZW0ge1xuICAgIGJhY2tncm91bmQ6ICNFOEVBRUQ7XG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyNnB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG5cbiAgLm11bHRpU2VsZWN0SXRlbV9sYWJlbCB7XG4gICAgcGFkZGluZzogMCA1cHggMCAxMHB4O1xuICB9XG5cbiAgLnNlbGVjdENvbnRhaW5lci5tdWx0aVNlbGVjdCBpbnB1dCB7XG4gICAgd2lkdGg6IGF1dG87XG4gICAgcGFkZGluZzogMDtcbiAgICBmbGV4LWdyb3c6IDE7XG4gIH1cblxuICAubXVsdGlTZWxlY3RJdGVtX2NsZWFyIHtcbiAgICBib3JkZXItcmFkaXVzOiAwIDRweCA0cHggMDtcbiAgICB3aWR0aDogMjBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cblxuICAubXVsdGlTZWxlY3RJdGVtX2NsZWFyOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gIH1cblxuICAubXVsdGlTZWxlY3RJdGVtX2NsZWFyIHN2ZyB7XG4gICAgd2lkdGg6IDE0cHg7XG4gICAgaGVpZ2h0OiAxNHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0b3A6IDNweDtcbiAgfVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvQ0UsZ0JBQWdCLDhCQUFDLENBQUMsQUFDaEIsTUFBTSxDQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUN6QixhQUFhLENBQUUsR0FBRyxDQUNsQixNQUFNLENBQUUsSUFBSSxDQUNaLFFBQVEsQ0FBRSxRQUFRLEFBQ3BCLENBQUMsQUFFRCwrQkFBZ0IsQ0FBQyxLQUFLLGVBQUMsQ0FBQyxBQUN0QixNQUFNLENBQUUsSUFBSSxDQUNaLEtBQUssQ0FBRSxPQUFPLENBQ2QsTUFBTSxDQUFFLElBQUksQ0FDWixXQUFXLENBQUUsSUFBSSxDQUNqQixPQUFPLENBQUUsQ0FBQyxDQUFDLElBQUksQ0FDZixLQUFLLENBQUUsSUFBSSxDQUNYLFVBQVUsQ0FBRSxXQUFXLENBQ3ZCLFNBQVMsQ0FBRSxJQUFJLENBQ2YsY0FBYyxDQUFFLE9BQU8sQUFDekIsQ0FBQyxBQUVELCtCQUFnQixDQUFDLG9CQUFLLGFBQWEsQUFBQyxDQUFDLEFBQ25DLEtBQUssQ0FBRSxPQUFPLEFBQ2hCLENBQUMsQUFFRCw4Q0FBZ0IsTUFBTSxBQUFDLENBQUMsQUFDdEIsWUFBWSxDQUFFLE9BQU8sQUFDdkIsQ0FBQyxBQUVELCtCQUFnQixDQUFDLG9CQUFLLE1BQU0sQUFBQyxDQUFDLEFBQzVCLE9BQU8sQ0FBRSxJQUFJLEFBQ2YsQ0FBQyxBQUVELFlBQVksOEJBQUMsQ0FBQyxBQUNaLFFBQVEsQ0FBRSxRQUFRLENBQ2xCLEtBQUssQ0FBRSxJQUFJLENBQ1gsR0FBRyxDQUFFLElBQUksQ0FDVCxLQUFLLENBQUUsSUFBSSxDQUNYLE1BQU0sQ0FBRSxJQUFJLENBQ1osS0FBSyxDQUFFLE9BQU8sQUFDaEIsQ0FBQyxBQUVELDBDQUFZLE1BQU0sQUFBQyxDQUFDLEFBQ2xCLEtBQUssQ0FBRSxPQUFPLEFBQ2hCLENBQUMsQUFFRCxZQUFZLDhCQUFDLENBQUMsQUFDWixPQUFPLENBQUUsSUFBSSxDQUNiLE9BQU8sQ0FBRSxDQUFDLENBQUMsSUFBSSxBQUNqQixDQUFDLEFBRUQsZ0JBQWdCLDhCQUFDLENBQUMsQUFDaEIsVUFBVSxDQUFFLE9BQU8sQ0FDbkIsWUFBWSxDQUFFLEdBQUcsQ0FDakIsYUFBYSxDQUFFLEdBQUcsQ0FDbEIsV0FBVyxDQUFFLElBQUksQ0FDakIsT0FBTyxDQUFFLElBQUksQ0FDYixNQUFNLENBQUUsT0FBTyxBQUNqQixDQUFDLEFBRUQsc0JBQXNCLDhCQUFDLENBQUMsQUFDdEIsT0FBTyxDQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQUFDdkIsQ0FBQyxBQUVELGdCQUFnQiwyQkFBWSxDQUFDLEtBQUssZUFBQyxDQUFDLEFBQ2xDLEtBQUssQ0FBRSxJQUFJLENBQ1gsT0FBTyxDQUFFLENBQUMsQ0FDVixTQUFTLENBQUUsQ0FBQyxBQUNkLENBQUMsQUFFRCxzQkFBc0IsOEJBQUMsQ0FBQyxBQUN0QixhQUFhLENBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUMxQixLQUFLLENBQUUsSUFBSSxDQUNYLFVBQVUsQ0FBRSxNQUFNLEFBQ3BCLENBQUMsQUFFRCxvREFBc0IsTUFBTSxBQUFDLENBQUMsQUFDNUIsZ0JBQWdCLENBQUUsR0FBRyxBQUN2QixDQUFDLEFBRUQscUNBQXNCLENBQUMsR0FBRyxlQUFDLENBQUMsQUFDMUIsS0FBSyxDQUFFLElBQUksQ0FDWCxNQUFNLENBQUUsSUFBSSxDQUNaLFFBQVEsQ0FBRSxRQUFRLENBQ2xCLEdBQUcsQ0FBRSxHQUFHLEFBQ1YsQ0FBQyJ9 */";
	append_dev(document.head, style);
}

function create_fragment$3(ctx) {
	let link;
	let t0;
	let div7;
	let div2;
	let div0;
	let t2;
	let div1;
	let svg0;
	let path0;
	let t3;
	let div5;
	let div3;
	let t5;
	let div4;
	let svg1;
	let path1;
	let t6;
	let input;
	let t7;
	let div6;
	let svg2;
	let path2;

	const block = {
		c: function create() {
			link = element("link");
			t0 = space();
			div7 = element("div");
			div2 = element("div");
			div0 = element("div");
			div0.textContent = "Pizza";
			t2 = space();
			div1 = element("div");
			svg0 = svg_element("svg");
			path0 = svg_element("path");
			t3 = space();
			div5 = element("div");
			div3 = element("div");
			div3.textContent = "Chips";
			t5 = space();
			div4 = element("div");
			svg1 = svg_element("svg");
			path1 = svg_element("path");
			t6 = space();
			input = element("input");
			t7 = space();
			div6 = element("div");
			svg2 = svg_element("svg");
			path2 = svg_element("path");
			attr_dev(link, "rel", "stylesheet");
			attr_dev(link, "href", "../reset.css");
			add_location(link, file$3, 1, 0, 26);
			attr_dev(div0, "class", "multiSelectItem_label svelte-1i6xooq");
			add_location(div0, file$3, 5, 6, 154);
			attr_dev(path0, "d", "M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z");
			add_location(path0, file$3, 10, 10, 370);
			attr_dev(svg0, "width", "100%");
			attr_dev(svg0, "height", "100%");
			attr_dev(svg0, "viewBox", "-2 -2 50 50");
			attr_dev(svg0, "focusable", "false");
			attr_dev(svg0, "role", "presentation");
			attr_dev(svg0, "class", "svelte-1i6xooq");
			add_location(svg0, file$3, 9, 8, 267);
			attr_dev(div1, "class", "multiSelectItem_clear svelte-1i6xooq");
			add_location(div1, file$3, 8, 6, 223);
			attr_dev(div2, "class", "multiSelectItem svelte-1i6xooq");
			add_location(div2, file$3, 4, 4, 118);
			attr_dev(div3, "class", "multiSelectItem_label svelte-1i6xooq");
			add_location(div3, file$3, 16, 6, 647);
			attr_dev(path1, "d", "M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z");
			add_location(path1, file$3, 21, 10, 863);
			attr_dev(svg1, "width", "100%");
			attr_dev(svg1, "height", "100%");
			attr_dev(svg1, "viewBox", "-2 -2 50 50");
			attr_dev(svg1, "focusable", "false");
			attr_dev(svg1, "role", "presentation");
			attr_dev(svg1, "class", "svelte-1i6xooq");
			add_location(svg1, file$3, 20, 8, 760);
			attr_dev(div4, "class", "multiSelectItem_clear svelte-1i6xooq");
			add_location(div4, file$3, 19, 6, 716);
			attr_dev(div5, "class", "multiSelectItem svelte-1i6xooq");
			add_location(div5, file$3, 15, 4, 611);
			attr_dev(input, "autocomplete", "off");
			attr_dev(input, "autocorrect", "off");
			attr_dev(input, "spellcheck", "true");
			attr_dev(input, "placeholder", "");
			attr_dev(input, "class", "svelte-1i6xooq");
			add_location(input, file$3, 26, 2, 1102);
			attr_dev(path2, "fill", "currentColor");
			attr_dev(path2, "d", "M34.923,37.251L24,26.328L13.077,37.251L9.436,33.61l10.923-10.923L9.436,11.765l3.641-3.641L24,19.047L34.923,8.124 l3.641,3.641L27.641,22.688L38.564,33.61L34.923,37.251z");
			add_location(path2, file$3, 29, 6, 1311);
			attr_dev(svg2, "width", "100%");
			attr_dev(svg2, "height", "100%");
			attr_dev(svg2, "viewBox", "-2 -2 50 50");
			attr_dev(svg2, "focusable", "false");
			attr_dev(svg2, "role", "presentation");
			add_location(svg2, file$3, 28, 4, 1212);
			attr_dev(div6, "class", "clearSelect svelte-1i6xooq");
			add_location(div6, file$3, 27, 2, 1182);
			attr_dev(div7, "class", "selectContainer multiSelect svelte-1i6xooq");
			add_location(div7, file$3, 3, 0, 72);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, link, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, div7, anchor);
			append_dev(div7, div2);
			append_dev(div2, div0);
			append_dev(div2, t2);
			append_dev(div2, div1);
			append_dev(div1, svg0);
			append_dev(svg0, path0);
			append_dev(div7, t3);
			append_dev(div7, div5);
			append_dev(div5, div3);
			append_dev(div5, t5);
			append_dev(div5, div4);
			append_dev(div4, svg1);
			append_dev(svg1, path1);
			append_dev(div7, t6);
			append_dev(div7, input);
			append_dev(div7, t7);
			append_dev(div7, div6);
			append_dev(div6, svg2);
			append_dev(svg2, path2);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(link);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div7);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Select_multiSelected", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Select_multiSelected> was created with unknown prop '${key}'`);
	});

	return [];
}

class Select_multiSelected extends SvelteComponentDev {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-1i6xooq-style")) add_css$2();
		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Select_multiSelected",
			options,
			id: create_fragment$3.name
		});
	}
}

/* test/src/List/List--default.svelte generated by Svelte v3.35.0 */

const file$2 = "test/src/List/List--default.svelte";

function add_css$1() {
	var style = element("style");
	style.id = "svelte-mj7ksi-style";
	style.textContent = ".listContainer.svelte-mj7ksi{box-shadow:0 2px 3px 0 rgba(44, 62, 80, 0.24);border-radius:4px;height:176px;overflow-y:auto}.listItem.svelte-mj7ksi{padding:20px}.listItem.svelte-mj7ksi:hover,.listItem.hover.svelte-mj7ksi{background:#e7f2ff}.listItem.svelte-mj7ksi:first-child{border-radius:4px 4px 0 0}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC0tZGVmYXVsdC5zdmVsdGUiLCJzb3VyY2VzIjpbIkxpc3QtLWRlZmF1bHQuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjwhLS0gREVWIE9OTFkgSU1QT1JUUyAtLT5cbjxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiLi4vcmVzZXQuY3NzXCIvPlxuXG48ZGl2IGNsYXNzPVwibGlzdENvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwibGlzdEl0ZW0gaG92ZXJcIj48ZGl2IGNsYXNzPVwiaXRlbVwiPkNob2NvbGF0ZTwvZGl2PjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibGlzdEl0ZW1cIj48ZGl2IGNsYXNzPVwiaXRlbVwiPlBpenphPC9kaXY+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJsaXN0SXRlbVwiPjxkaXYgY2xhc3M9XCJpdGVtXCI+Q2FrZTwvZGl2PjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibGlzdEl0ZW1cIj48ZGl2IGNsYXNzPVwiaXRlbVwiPkNoaXBzPC9kaXY+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJsaXN0SXRlbVwiPjxkaXYgY2xhc3M9XCJpdGVtXCI+SWNlIENyZWFtPC9kaXY+PC9kaXY+XG48L2Rpdj5cblxuPHN0eWxlPlxuICAubGlzdENvbnRhaW5lciB7XG4gICAgYm94LXNoYWRvdzogMCAycHggM3B4IDAgcmdiYSg0NCwgNjIsIDgwLCAwLjI0KTtcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgaGVpZ2h0OiAxNzZweDtcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xuICB9XG5cbiAgLmxpc3RJdGVtIHtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICB9XG5cbiAgLmxpc3RJdGVtOmhvdmVyLFxuICAubGlzdEl0ZW0uaG92ZXIge1xuICAgIGJhY2tncm91bmQ6ICNlN2YyZmY7XG4gIH1cblxuICAubGlzdEl0ZW06Zmlyc3QtY2hpbGQge1xuICAgIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwO1xuICB9XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVlFLGNBQWMsY0FBQyxDQUFDLEFBQ2QsVUFBVSxDQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUM5QyxhQUFhLENBQUUsR0FBRyxDQUNsQixNQUFNLENBQUUsS0FBSyxDQUNiLFVBQVUsQ0FBRSxJQUFJLEFBQ2xCLENBQUMsQUFFRCxTQUFTLGNBQUMsQ0FBQyxBQUNULE9BQU8sQ0FBRSxJQUFJLEFBQ2YsQ0FBQyxBQUVELHVCQUFTLE1BQU0sQ0FDZixTQUFTLE1BQU0sY0FBQyxDQUFDLEFBQ2YsVUFBVSxDQUFFLE9BQU8sQUFDckIsQ0FBQyxBQUVELHVCQUFTLFlBQVksQUFBQyxDQUFDLEFBQ3JCLGFBQWEsQ0FBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQzVCLENBQUMifQ== */";
	append_dev(document.head, style);
}

function create_fragment$2(ctx) {
	let link;
	let t0;
	let div10;
	let div1;
	let div0;
	let t2;
	let div3;
	let div2;
	let t4;
	let div5;
	let div4;
	let t6;
	let div7;
	let div6;
	let t8;
	let div9;
	let div8;

	const block = {
		c: function create() {
			link = element("link");
			t0 = space();
			div10 = element("div");
			div1 = element("div");
			div0 = element("div");
			div0.textContent = "Chocolate";
			t2 = space();
			div3 = element("div");
			div2 = element("div");
			div2.textContent = "Pizza";
			t4 = space();
			div5 = element("div");
			div4 = element("div");
			div4.textContent = "Cake";
			t6 = space();
			div7 = element("div");
			div6 = element("div");
			div6.textContent = "Chips";
			t8 = space();
			div9 = element("div");
			div8 = element("div");
			div8.textContent = "Ice Cream";
			attr_dev(link, "rel", "stylesheet");
			attr_dev(link, "href", "../reset.css");
			add_location(link, file$2, 1, 0, 26);
			attr_dev(div0, "class", "item");
			add_location(div0, file$2, 4, 30, 130);
			attr_dev(div1, "class", "listItem hover svelte-mj7ksi");
			add_location(div1, file$2, 4, 2, 102);
			attr_dev(div2, "class", "item");
			add_location(div2, file$2, 5, 24, 194);
			attr_dev(div3, "class", "listItem svelte-mj7ksi");
			add_location(div3, file$2, 5, 2, 172);
			attr_dev(div4, "class", "item");
			add_location(div4, file$2, 6, 24, 254);
			attr_dev(div5, "class", "listItem svelte-mj7ksi");
			add_location(div5, file$2, 6, 2, 232);
			attr_dev(div6, "class", "item");
			add_location(div6, file$2, 7, 24, 313);
			attr_dev(div7, "class", "listItem svelte-mj7ksi");
			add_location(div7, file$2, 7, 2, 291);
			attr_dev(div8, "class", "item");
			add_location(div8, file$2, 8, 24, 373);
			attr_dev(div9, "class", "listItem svelte-mj7ksi");
			add_location(div9, file$2, 8, 2, 351);
			attr_dev(div10, "class", "listContainer svelte-mj7ksi");
			add_location(div10, file$2, 3, 0, 72);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, link, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, div10, anchor);
			append_dev(div10, div1);
			append_dev(div1, div0);
			append_dev(div10, t2);
			append_dev(div10, div3);
			append_dev(div3, div2);
			append_dev(div10, t4);
			append_dev(div10, div5);
			append_dev(div5, div4);
			append_dev(div10, t6);
			append_dev(div10, div7);
			append_dev(div7, div6);
			append_dev(div10, t8);
			append_dev(div10, div9);
			append_dev(div9, div8);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(link);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div10);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("List_default", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<List_default> was created with unknown prop '${key}'`);
	});

	return [];
}

class List_default extends SvelteComponentDev {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-mj7ksi-style")) add_css$1();
		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "List_default",
			options,
			id: create_fragment$2.name
		});
	}
}

/* test/src/Select/ParentContainer.svelte generated by Svelte v3.35.0 */
const file$1 = "test/src/Select/ParentContainer.svelte";

function create_fragment$1(ctx) {
	let div;
	let select;
	let updating_value;
	let t0;
	let p;
	let t1_value = /*value*/ ctx[0].label + "";
	let t1;
	let current;

	function select_value_binding(value) {
		/*select_value_binding*/ ctx[2](value);
	}

	let select_props = { items: /*items*/ ctx[1] };

	if (/*value*/ ctx[0] !== void 0) {
		select_props.value = /*value*/ ctx[0];
	}

	select = new Select({ props: select_props, $$inline: true });
	binding_callbacks.push(() => bind(select, "value", select_value_binding));

	const block = {
		c: function create() {
			div = element("div");
			create_component(select.$$.fragment);
			t0 = space();
			p = element("p");
			t1 = text(t1_value);
			attr_dev(p, "class", "result");
			add_location(p, file$1, 10, 2, 178);
			attr_dev(div, "class", "container");
			add_location(div, file$1, 7, 0, 112);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(select, div, null);
			append_dev(div, t0);
			append_dev(div, p);
			append_dev(p, t1);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const select_changes = {};
			if (dirty & /*items*/ 2) select_changes.items = /*items*/ ctx[1];

			if (!updating_value && dirty & /*value*/ 1) {
				updating_value = true;
				select_changes.value = /*value*/ ctx[0];
				add_flush_callback(() => updating_value = false);
			}

			select.$set(select_changes);
			if ((!current || dirty & /*value*/ 1) && t1_value !== (t1_value = /*value*/ ctx[0].label + "")) set_data_dev(t1, t1_value);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(select.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(select.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(select);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("ParentContainer", slots, []);
	let { value } = $$props;
	let { items } = $$props;
	const writable_props = ["value", "items"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ParentContainer> was created with unknown prop '${key}'`);
	});

	function select_value_binding(value$1) {
		value = value$1;
		$$invalidate(0, value);
	}

	$$self.$$set = $$props => {
		if ("value" in $$props) $$invalidate(0, value = $$props.value);
		if ("items" in $$props) $$invalidate(1, items = $$props.items);
	};

	$$self.$capture_state = () => ({ Select, value, items });

	$$self.$inject_state = $$props => {
		if ("value" in $$props) $$invalidate(0, value = $$props.value);
		if ("items" in $$props) $$invalidate(1, items = $$props.items);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [value, items, select_value_binding];
}

class ParentContainer extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { value: 0, items: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ParentContainer",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*value*/ ctx[0] === undefined && !("value" in props)) {
			console.warn("<ParentContainer> was created without expected prop 'value'");
		}

		if (/*items*/ ctx[1] === undefined && !("items" in props)) {
			console.warn("<ParentContainer> was created without expected prop 'items'");
		}
	}

	get value() {
		return this.$$.ctx[0];
	}

	set value(value) {
		this.$set({ value });
		flush();
	}

	get items() {
		return this.$$.ctx[1];
	}

	set items(items) {
		this.$set({ items });
		flush();
	}
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */













function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var fulfil;
var done = new Promise(function (f) {
    fulfil = f;
});
function start() {
    if (!running) {
        running = true;
        console.log('TAP version 13');
        Promise.resolve().then(function () {
            var hasOnly = tests.some(function (test) { return test.only; });
            tests.forEach(function (test) {
                test.shouldRun = test.skip
                    ? false
                    : hasOnly ? test.only : true;
            });
            dequeue();
        });
    }
}
var test = Object.assign(function test(name, fn) {
    tests.push({ name: name, fn: fn, skip: false, only: false, shouldRun: false });
    start();
}, {
    skip: function (name, fn) {
        tests.push({ name: name, fn: fn, skip: true, only: false, shouldRun: null });
        start();
    },
    only: function (name, fn) {
        tests.push({ name: name, fn: fn, skip: false, only: true, shouldRun: null });
        start();
    }
});
var i = 0;
var running = false;
var tests = [];
var passed = 0;
var failed = 0;
var skipped = 0;
var isNode = typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]';
function logResult(ok, operator, msg, info) {
    if (info === void 0) { info = {}; }
    if (ok) {
        console.log("ok " + i + " \u2014 " + msg);
        passed += 1;
    }
    else {
        console.log("not ok " + i + " \u2014 " + msg);
        failed += 1;
        console.log('  ---');
        console.log("  operator: " + operator);
        if (isNode) {
            var util = require('util');
            if ('expected' in info)
                console.log("  expected:\n    " + util.format(info.expected).replace(/\n/gm, "\n    "));
            if ('actual' in info)
                console.log("  actual:\n    " + util.format(info.actual).replace(/\n/gm, "\n    "));
        }
        else {
            if ('expected' in info)
                console.log("  expected:", info.expected);
            if ('actual' in info)
                console.log("  actual:", info.actual);
        }
        // find where the error occurred, and try to clean it up
        var lines = new Error().stack.split('\n').slice(3);
        var cwd_1 = '';
        if (isNode) {
            cwd_1 = process.cwd();
            if (/[\/\\]/.test(cwd_1[0]))
                cwd_1 += cwd_1[0];
            var dirname = typeof __dirname === 'string' && __dirname.replace(/dist$/, '');
            for (var i_1 = 0; i_1 < lines.length; i_1 += 1) {
                if (~lines[i_1].indexOf(dirname)) {
                    lines = lines.slice(0, i_1);
                    break;
                }
            }
        }
        var stack = lines
            .map(function (line) { return "    " + line.replace(cwd_1, '').trim(); })
            .join('\n');
        console.log("  stack:   \n" + stack);
        console.log("  ...");
    }
}
var assert = {
    fail: function (msg) { return logResult(false, 'fail', msg); },
    pass: function (msg) { return logResult(true, 'pass', msg); },
    ok: function (value, msg) {
        if (msg === void 0) { msg = 'should be truthy'; }
        return logResult(Boolean(value), 'ok', msg, {
            actual: value,
            expected: true
        });
    },
    equal: function (a, b, msg) {
        if (msg === void 0) { msg = 'should be equal'; }
        return logResult(a === b, 'equal', msg, {
            actual: a,
            expected: b
        });
    },
    throws: function (fn, expected, msg) {
        if (msg === void 0) { msg = 'should throw'; }
        try {
            fn();
            logResult(false, 'throws', msg, {
                expected: expected
            });
        }
        catch (err) {
            if (expected instanceof Error) {
                logResult(err.name === expected.name, 'throws', msg, {
                    actual: err.name,
                    expected: expected.name
                });
            }
            else if (expected instanceof RegExp) {
                logResult(expected.test(err.toString()), 'throws', msg, {
                    actual: err.toString(),
                    expected: expected
                });
            }
            else if (typeof expected === 'function') {
                logResult(expected(err), 'throws', msg, {
                    actual: err
                });
            }
            else {
                throw new Error("Second argument to t.throws must be an Error constructor, regex, or function");
            }
        }
    }
};
function dequeue() {
    return __awaiter(this, void 0, void 0, function () {
        var test, err_1, total;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    test = tests[i++];
                    if (!test) return [3 /*break*/, 5];
                    if (!test.shouldRun) {
                        if (test.skip) {
                            console.log("# skip " + test.name);
                        }
                        skipped += 1;
                        dequeue();
                        return [2 /*return*/];
                    }
                    console.log("# " + test.name);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, test.fn(assert)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    failed += 1;
                    console.log("not ok " + i + " \u2014 " + err_1.message);
                    console.error("  " + err_1.stack.replace(/^\s+/gm, '    '));
                    return [3 /*break*/, 4];
                case 4:
                    dequeue();
                    return [3 /*break*/, 6];
                case 5:
                    total = passed + failed + skipped;
                    console.log("\n1.." + total);
                    console.log("# tests " + total);
                    if (passed)
                        console.log("# pass " + passed);
                    if (failed)
                        console.log("# fail " + failed);
                    if (skipped)
                        console.log("# skip " + skipped);
                    fulfil();
                    if (isNode)
                        process.exit(failed ? 1 : 0);
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}

function querySelectorClick(selector) {
  document.querySelector(selector).click();
  return new Promise(f => setTimeout(f, 0));
}

function handleKeyboard(key) {
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': key}));
  return new Promise(f => setTimeout(f, 0));
}

function handleSet(component, data) {
  component.$set(data);
  return new Promise(f => setTimeout(f, 0));
}

function focus(element, setFocus) {
  return new Promise(fulfil => {
    element.addEventListener('focus', function handler() {
      element.removeEventListener('focus', handler);
      fulfil(true);
    });

    setFocus();
  });
}

// setup
const target = document.createElement('main');
document.body.appendChild(target);

const testTarget = document.createElement("div");
testTarget.id = 'testTemplate';
document.body.appendChild(testTarget);

const extraTarget = document.createElement("div");
extraTarget.id = 'extra';
document.body.appendChild(extraTarget);



const items = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'pizza', label: 'Pizza'},
  {value: 'cake', label: 'Cake'},
  {value: 'chips', label: 'Chips'},
  {value: 'ice-cream', label: 'Ice Cream'},
];
const itemsWithGroup = [
  {value: 'chocolate', label: 'Chocolate', group: 'Sweet'},
  {value: 'pizza', label: 'Pizza', group: 'Savory'},
  {value: 'cake', label: 'Cake', group: 'Sweet'},
  {value: 'chips', label: 'Chips', group: 'Savory'},
  {value: 'ice-cream', label: 'Ice Cream', group: 'Sweet'}
];
const itemsWithIndex = [
  {value: 'chocolate', label: 'Chocolate', index: 0},
  {value: 'pizza', label: 'Pizza', index: 1},
  {value: 'cake', label: 'Cake', index: 2},
  {value: 'chips', label: 'Chips', index: 3},
  {value: 'ice-cream', label: 'Ice Cream', index: 4},
];

function wait(ms) {
  return new Promise(f => setTimeout(f, ms));
}

assert.htmlEqual = (a, b) => {
  assert.equal(normalizeHtml(a), normalizeHtml(b));
};

assert.arrayEqual = (a, b) => {
  assert.ok(Array.isArray(a));
  assert.ok(Array.isArray(b));
  assert.equal(a.length, b.length);
  assert.ok(a.every((val, i) => val === b[i]));
};

// tests
test('with no data creates default elements', async (t) => {
  const testTemplate = new Select_default({
    target: testTarget
  });

  const select = new Select({
    target,
  });

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

  testTemplate.$destroy();
  select.$destroy();
});

test('when isFocused true container adds focused class', async (t) => {
  const select = new Select({
    target,
    props: {
      isFocused: true
    }
  });

  t.ok(target.querySelector('.focused'));

  select.$destroy();
});

test('when isFocused changes to true input should focus', async (t) => {
  const select = new Select({
    target,
    props: {
      isFocused: false
    }
  });

  const setFocus = () => {
    select.$set({isFocused: true});
  };

  const hasFocused = await focus(target.querySelector('.selectContainer input'), setFocus);
  t.ok(hasFocused);
  select.$destroy();
});

test('default empty list', async (t) => {
  const list = new List({
    target,
  });

  t.ok(target.querySelector('.empty'));

  list.$destroy();
});

test('default list with five items', async (t) => {
  const list = new List({
    target,
    props: {
      items: itemsWithIndex
    }
  });

  t.ok(target.getElementsByClassName('listItem').length);

  list.$destroy();
});

test('should highlight active list item', async (t) => {
  const list = new List({
    target,
    props: {
      items: itemsWithIndex,
      value: {value: 'pizza', label: 'Pizza', index: 1}
    }
  });

  t.ok(target.querySelector('.listItem .active').innerHTML === 'Pizza');

  list.$destroy();
});

test('list scrolls to active item', async (t) => {
  const extras = [
    {value: 'chicken-schnitzel', label: 'Chicken Schnitzel', index: 5},
    {value: 'fried-chicken', label: 'Fried Chicken', index: 6},
    {value: 'sunday-roast', label: 'Sunday Roast', index: 7},
  ];
  const list = new List({
    target,
    props: {
      items: itemsWithIndex.concat(extras),
      value: {value: 'sunday-roast', label: 'Sunday Roast'},
    }
  });

  let offsetBounding;
  const container = target.querySelector('.listContainer');
  const focusedElemBounding = container.querySelector('.listItem .active');
  if (focusedElemBounding) {
    offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
  }

  t.equal(offsetBounding, 0);
  list.$destroy();
});

test('list scrolls to hovered item when navigating with keys', async (t) => {
  const extras = [
    {value: 'chicken-schnitzel', label: 'Chicken Schnitzel', index: 5},
    {value: 'fried-chicken', label: 'Fried Chicken', index: 6},
    {value: 'sunday-roast', label: 'Sunday Roast', index: 7},
  ];
  const list = new List({
    target,
    props: {
      items: itemsWithIndex.concat(extras)
    }
  });

  const container = target.querySelector('.listContainer');
  const totalListItems = container.querySelectorAll('.listItem').length;
  let selectedItemsAreWithinBounds = true;
  let loopCount = 1;

  do {
    await handleKeyboard('ArrowDown');

    const hoveredItem = container.querySelector('.listItem .hover');
    const isInViewport = container.getBoundingClientRect().bottom - hoveredItem.getBoundingClientRect().bottom >= 0;

    selectedItemsAreWithinBounds = selectedItemsAreWithinBounds && isInViewport;

    loopCount += 1;
  } while (loopCount < totalListItems);


  t.ok(selectedItemsAreWithinBounds);
  list.$destroy();
});

test('hover item updates on keyUp or keyDown', async (t) => {
  const list = new List({
    target,
    props: {
      items: items,
      activeItemIndex: 0,
    }
  });

  await handleKeyboard('ArrowDown');
  const focusedElemBounding = target.querySelector('.listItem .hover');
  t.equal(focusedElemBounding.innerHTML.trim(), `Pizza`);
  list.$destroy();
});

test('on enter active item fires a itemSelected event', async (t) => {
  const list = new List({
    target,
    props: {
      items: itemsWithIndex
    }
  });

  let value = undefined;
  list.$on('itemSelected', event => {
    value = event;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.equal(JSON.stringify(value.detail), JSON.stringify({value: 'cake', label: 'Cake', index: 2}));
  list.$destroy();
});

test('on tab active item fires a itemSelected event', async (t) => {
  const list = new List({
    target,
    props: {
      items: itemsWithIndex
    }
  });

  let value = undefined;
  list.$on('itemSelected', event => {
    value = event;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));
  t.equal(JSON.stringify(value.detail), JSON.stringify({value: 'cake', label: 'Cake', index: 2}));
  list.$destroy();
});

test('on selected of current active item does not fire a itemSelected event', async (t) => {
  const list = new List({
    target,
    props: {
      items: itemsWithIndex,
      value: { value: 'chocolate', label: 'Chocolate', index: 0 }
    }
  });

  let itemSelectedFired = false;

  list.$on('itemSelected', () => {
    itemSelectedFired = true;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  t.equal(itemSelectedFired, false);
  list.$destroy();
});

test('selected item\'s default view', async (t) => {
  const select = new Select({
    target,
    props: {
      value: {value: 'chips', label: 'Chips'},
    }
  });

  t.ok(target.querySelector('.selectedItem .selection').innerHTML === 'Chips');
  select.$destroy();
});

test('select view updates with value updates', async (t) => {
  const select = new Select({
    target,
  });

  await handleSet(select, {value: {value: 'chips', label: 'Chips'}});
  t.ok(target.querySelector('.selectedItem .selection').innerHTML === 'Chips');

  select.$destroy();
});

test('clear wipes value and updates view', async (t) => {
  const select = new Select({
    target,
    props: {
      value: {value: 'chips', label: 'Chips'},
    }
  });

  await wait(0);
  await handleSet(select, {value: undefined});
  t.ok(!target.querySelector('.selectedItem .selection'));

  select.$destroy();
});

test('clicking on Select opens List', async (t) => {
  const select = new Select({
    target,
  });

  await querySelectorClick('.selectContainer');
  const listContainer = document.querySelector('.listContainer');
  t.ok(listContainer);

  select.$destroy();
});

test('Select opens List populated with items', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  await querySelectorClick('.selectContainer');
  t.ok(target.querySelector('.listItem'));

  select.$destroy();
});

test('List starts with first item in hover state', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  await querySelectorClick('.selectContainer');
  t.ok(target.querySelector('.listItem .hover').innerHTML === 'Chocolate');

  select.$destroy();
});

test('List starts with first item in hover state', async (t) => {
  const testTemplate = new List_default({
    target: testTarget
  });

  const select = new Select({
    target,
    props: {
      items,
    }
  });

  document.querySelector('.selectContainer').click();

  testTemplate.$destroy();
  select.$destroy();
});

test('select item from list', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
    }
  });

  await querySelectorClick('.selectContainer');
  await handleKeyboard('ArrowDown');
  await handleKeyboard('ArrowDown');
  await handleKeyboard('Enter');
  t.ok(document.querySelector('.selection').innerHTML === 'Cake');

  select.$destroy();
});

test('when listPosition is set to top list should be above the input', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      listOpen: true,
      listPlacement: 'top'
    }
  });

  await wait(0);
  const distanceOfListBottomFromViewportTop = document.querySelector('.listContainer').getBoundingClientRect().bottom;
  const distanceOfInputTopFromViewportTop = document.querySelector('.selectContainer').getBoundingClientRect().top;

  t.ok(distanceOfListBottomFromViewportTop <= distanceOfInputTopFromViewportTop);

  select.$destroy();
});

test('when listPlacement is set to bottom the list should be below the input', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      listOpen: true,
      listPlacement: 'bottom'
    }
  });

  await wait(0);
  const distanceOfListTopFromViewportTop = document.querySelector('.listContainer').getBoundingClientRect().top;
  const distanceOfInputBottomFromViewportTop = document.querySelector('.selectContainer').getBoundingClientRect().bottom;

  t.ok(distanceOfListTopFromViewportTop >= distanceOfInputBottomFromViewportTop);

  select.$destroy();
});

test('blur should close list and remove focus from select', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    props: {
      items
    }
  });

  select.$set({isFocused: true});
  div.click();
  div.remove();
  t.ok(!document.querySelector('.listContainer'));
  t.ok(document.querySelector('.selectContainer input') !== document.activeElement);
  select.$destroy();
});

test('selecting item should close list but keep focus on select', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);
  t.ok(!document.querySelector('.listContainer'));
  t.ok(document.querySelector('.selectContainer.focused'));
  select.$destroy();
});

test('clicking Select with selected item should open list with item listed as active', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);
  document.querySelector('.selectContainer').click();
  await wait(0);
  t.ok(document.querySelector('.listItem .hover').innerHTML === 'Cake');
  select.$destroy();
});

test('focus on Select input updates focus state', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });
  
  document.querySelector('.selectContainer input').focus();

  t.ok(select.isFocused);
  select.$destroy();
});

test('key up and down when Select focused opens list', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer input').focus();
  await wait(0);
  t.ok(select.isFocused);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  await wait(0);
  t.ok(document.querySelector('.listContainer'));

  select.$destroy();
});

test('List should keep width of parent Select', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isFocused: true
    }
  });

  document.querySelector('.selectContainer input').focus();
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  await wait(0);
  const selectContainer = document.querySelector('.selectContainer');
  const listContainer = document.querySelector('.listContainer');
  t.equal(selectContainer.offsetWidth, listContainer.offsetWidth);

  select.$destroy();
});

test('Placeholder text should reappear when List is closed', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  div.click();
  div.remove();
  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, 'Select...');

  select.$destroy();
});

test('typing in Select filter will hide selected Item', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  select.$set({filterText: 'potato'});
  t.ok(!document.querySelector('.selectContainer .value'));

  select.$destroy();
});

test('clearing selected item closes List if open', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);
  select.handleClear();
  await wait(0);
  t.ok(!document.querySelector('.listContainer'));

  select.$destroy();
});

test('closing List clears Select filter text', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  select.$set({filterText: 'potato'});
  div.click();
  div.remove();
  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, 'Select...');

  select.$destroy();
});

test('closing List clears Select filter text', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  select.$set({filterText: 'potato'});
  div.click();
  div.remove();
  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, 'Select...');

  select.$destroy();
});

test('closing List item clears Select filter text', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  select.$set({filterText: 'potato'});
  div.click();
  div.remove();
  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, 'Select...');

  select.$destroy();
});

test('typing while Select is focused populates Select filter text', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  select.$set({isFocused: true});
  document.querySelector('.selectContainer input').blur();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 's'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
  // KeyboardEvent not firing in svelte - not sure why, manual test seems to work

  select.$destroy();
});

test('Select input placeholder wipes while item is selected', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {name: 'Item #2'},
    }
  });

  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, '');

  select.$destroy();
});

test('Select listOpen state controls List', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      listOpen: true
    }
  });

  await wait(0);
  t.ok(document.querySelector('.listContainer'));
  await handleSet(select, {listOpen: false});
  t.ok(!document.querySelector('.listContainer'));

  select.$destroy();
});

test('clicking Select toggles List open state', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  t.ok(!document.querySelector('.listContainer'));
  await querySelectorClick('.selectContainer');
  t.ok(document.querySelector('.listContainer'));
  await querySelectorClick('.selectContainer');
  t.ok(!document.querySelector('.listContainer'));

  select.$destroy();
});

test('Select filter text filters list', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  await wait(0);
  t.ok(select.filteredItems.length === 5);
  await handleSet(select, {filterText: 'Ice'});
  t.ok(select.filteredItems.length === 1);

  select.$destroy();
});

test('Select filter text filters list with itemFilter', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      itemFilter: (label, filterText, option) => label === 'Ice Cream'
    }
  });

  await wait(0);
  t.ok(select.filteredItems.length === 5);
  await handleSet(select, {filterText: 'cream ice'});
  t.ok(select.filteredItems.length === 1);

  select.$destroy();
});

test('Typing in the Select filter opens List', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isFocused: true
    }
  });

  await handleSet(select, {filterText: '5'});
  t.ok(document.querySelector('.listContainer'));
  select.$destroy();
});

test('While filtering, the first item in List should receive hover class', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isFocused: true
    }
  });

  await handleSet(select, {filterText: 'I'});
  t.ok(document.querySelector('.listItem .hover'));
  select.$destroy();
});

test('Select container styles can be overridden', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {name: 'Item #2'},
      containerStyles: `padding-left: 40px;`
    }
  });

  t.equal(document.querySelector('.selectContainer').style.cssText, `padding-left: 40px;`);
  select.$destroy();
});

test('Select can be disabled', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isDisabled: true,
    }
  });

  t.ok(document.querySelector('.selectContainer.disabled'));

  select.$destroy();
});

test('Select List closes when you click enter', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isFocused: true
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));


  select.$destroy();
});

test('tabbing should move between tabIndexes and others Selects', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isFocused: false
    }
  });

  const other = new Select({
    target: extraTarget,
    props: {
      items,
      isFocused: false
    }
  });

  // window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));
  // TAB not working from Puppeteer - not sure why.

  select.$destroy();
  other.$destroy();
});

test(`shouldn't be able to clear a disabled Select`, async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isDisabled: true,
      value: {name: 'Item #4'}
    }
  });


  t.ok(!document.querySelector('.clearSelect'));

  select.$destroy();
});

test(`two way binding between Select and it's parent component`, async (t) => {
  const parent = new ParentContainer({
    target,
    props: {
      items,
      value: {value: 'chips', label: 'Chips'},
    }
  });

  t.equal(document.querySelector('.selection').innerHTML, document.querySelector('.result').innerHTML);

  parent.$set({
    value: {value: 'ice-cream', label: 'Ice Cream'},
  });

  t.equal(document.querySelector('.selection').innerHTML, document.querySelector('.result').innerHTML);
  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.equal(document.querySelector('.selection').innerHTML, document.querySelector('.result').innerHTML);

  parent.$destroy();
});

test(`show ellipsis for overflowing text in a List item`, async (t) => {
  const longest = 'super super super super super super super super super super super super super super super super super super super super super super super super super super super super loooooonnnng name';

  target.style.width = '300px';

  const list = new List({
    target,
    props: {
      items: [
        {
          index: 0,
          label: longest
        },
        {
          index: 1,
          label: 'Not so loooooonnnng name'
        }
      ]
    }
  });

  const first = document.querySelector('.listItem:first-child .item');
  const last = document.querySelector('.listItem:last-child .item');

  t.ok(first.scrollWidth > first.clientWidth);
  t.ok(last.scrollWidth === last.clientWidth);

  list.$destroy();
  target.style.width = '';
});


test('clicking between Selects should close and blur other Select', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isFocused: false
    }
  });

  const other = new Select({
    target: extraTarget,
    props: {
      items,
      isFocused: false
    }
  });

  await querySelectorClick('.selectContainer');
  t.ok(select.list);
  await querySelectorClick('#extra .selectContainer');
  t.ok(!select.list);
  t.ok(other.list);

  select.$destroy();
  other.$destroy();
});

test('if only one item in list it should have hover state', async (t) => {
  const list = new List({
    target,
    props: {
      items: [{
        index: 0,
        name: 'test one'
      }]
    }
  });

  t.ok(document.querySelector('.listItem .item').classList.contains('hover'));

  list.$destroy();
});

test(`hovered item in a filtered list shows hover state`, async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  select.$set({filterText: 'i'});

  // const lastItem = document.querySelector('.listItem:last-child');
  // hover item and check for hover state

  t.ok(true);

  select.$destroy();
});

test(`data shouldn't be stripped from item - currently only saves name`, async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  await querySelectorClick('.selectContainer');
  await querySelectorClick('.listItem');
  t.equal(JSON.stringify(select.value), JSON.stringify({value: 'chocolate', label: 'Chocolate'}));

  select.$destroy();
});

test('should not be able to clear when clearing is disabled', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isClearable: false
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  t.ok(!document.querySelector('.clearSelect'));

  select.$destroy();
});

test('should not be able to search when searching is disabled', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isSearchable: false
    }
  });

  const selectInput = document.querySelector('.selectContainer input');
  t.ok(selectInput.attributes.readonly);

  select.$destroy();
});

test('should display indicator when searching is disabled', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    props: {
      items,
      isSearchable: false
    }
  });

  t.ok(document.querySelector('.indicator'));

  select.$destroy();
});

test('placeholder should be prop value', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const placeholder = 'Test placeholder value';

  const select = new Select({
    target,
    props: {
      items: itemsWithGroup,
      placeholder
    }
  });

  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, placeholder);

  select.$destroy();
});

test('should display spinner when waiting is enabled', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    props: {
      items,
      isWaiting: true
    }
  });

  t.ok(document.querySelector('.spinner'));

  select.$destroy();
});

test('inputStyles prop applies css to select input', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {value: 'pizza', label: 'Pizza'},
      inputStyles: `padding-left: 40px;`
    }
  });

  t.equal(document.querySelector('.selectContainer input').style.cssText, `padding-left: 40px;`);
  select.$destroy();
});

test('items should be grouped by groupBy expression', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      items: itemsWithGroup,
      groupBy
    }
  });

  function groupBy(item) {
    return item.group;
  }

  await wait(0);

  const groupedListItems = select.list.items;

  groupedListItems.forEach((item, itemIndex) => {
    if(itemIndex > 0) {
      const prevItem = groupedListItems[itemIndex - 1];
      const prevItemIsHeaderOrInSameGroup = item.group === (prevItem.isGroupHeader ? prevItem.value : prevItem.group);
      t.ok(item.isGroupHeader || prevItemIsHeaderOrInSameGroup);
    }
  });

  select.$destroy();
});


test('clicking group header should not make a selected', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      items: itemsWithGroup,
      groupBy: (item) => item.group
    }
  });

  await wait(0);
  await querySelectorClick('.listGroupTitle');

  t.equal(select.value, undefined);

  select.$destroy();
});

test('when groupBy, no active item and keydown enter is fired then list should close without selecting item', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      items: itemsWithGroup,
      groupBy: (item) => item.group
    }
  });

  await wait(0);
  await querySelectorClick('.selectContainer');
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.equal(select.value, undefined);

  select.$destroy();
});

test('when isGroupHeaderSelectable clicking group header should select createGroupHeaderItem(groupValue,item)', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      items: itemsWithGroup,
      isGroupHeaderSelectable: true,
      groupBy,
      createGroupHeaderItem
    }
  });

  function groupBy(item) {
    return item.group;
  }

  function createGroupHeaderItem(groupValue, item) {
    return {
      label: `XXX ${groupValue} XXX ${item.label}`
    };
  }

  await querySelectorClick('.selectContainer');

  const groupHeaderItem = select.list.items[0];
  const groupItem = select.list.items.find((item) => {
    return item.group === groupHeaderItem.id;
  });

  await querySelectorClick('.listItem');

  t.ok(select.value.isGroupHeader);
  t.equal(select.value.label, createGroupHeaderItem(groupBy(groupItem), groupItem).label);

  select.$destroy();
});

test('group headers label should be created by getGroupHeaderLabel(item)', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      items: itemsWithGroup,
      groupBy,
      getGroupHeaderLabel
    }
  });

  function groupBy(item) {
    return item.group;
  }

  function getGroupHeaderLabel(item) {
    return `Group label is ${item.id}`;
  }

  await querySelectorClick('.selectContainer');

  const groupHeaderItem = select.list.items[0];

  t.equal(target.querySelector('.listGroupTitle').textContent, getGroupHeaderLabel(groupHeaderItem));

  select.$destroy();
});

test('groups should be sorted by expression', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      items: itemsWithGroup,
      groupBy: (item) => item.group,
      groupFilter: (groups) => groups.reverse()
    }
  });

  await wait();

  t.ok(target.querySelector('.listGroupTitle').textContent.trim() === 'Savory');
  t.ok(target.querySelector('.listItem').textContent.trim() === 'Pizza');

  select.$destroy();
});

test('when isMulti is true show each item in value', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [
        {value: 'pizza', label: 'Pizza'},
        {value: 'chips', label: 'Chips'},
      ],
    }
  });

  const all = target.querySelectorAll('.multiSelectItem .multiSelectItem_label');
  t.ok(all[0].innerHTML === 'Pizza');
  t.ok(all[1].innerHTML === 'Chips');

  select.$destroy();
});

test('when isMulti is true and value is undefined show placeholder text', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: undefined
    }
  });

  t.ok(!target.querySelector('.multiSelectItem'));

  select.$destroy();
});

test('when isMulti is true clicking item in List will populate value', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: undefined
    }
  });

  await querySelectorClick('.selectContainer');
  await querySelectorClick('.listItem');

  t.equal(JSON.stringify(select.value), JSON.stringify([{value: 'chocolate', label: 'Chocolate'}]));

  select.$destroy();
});

test('when isMulti is true items in value will not appear in List', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [{value: 'chocolate', label: 'Chocolate'}]
    }
  });

  t.equal(JSON.stringify(select.filteredItems), JSON.stringify([
    {value: 'pizza', label: 'Pizza'},
    {value: 'cake', label: 'Cake'},
    {value: 'chips', label: 'Chips'},
    {value: 'ice-cream', label: 'Ice Cream'}
  ]));

  select.$destroy();
});

test('when isMulti is true both value and filterText filters List', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      isMulti: true,
      items,
      filterText: 'Pizza',
      value: [{value: 'chocolate', label: 'Chocolate'}]
    }
  });

  t.equal(JSON.stringify(select.filteredItems), JSON.stringify([
    {value: 'pizza', label: 'Pizza'}
  ]));

  select.$destroy();
});

test('when isMulti is true clicking X on a selected item will remove it from value', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}]
    }
  });

  document.querySelector('.multiSelectItem_clear').click();
  t.equal(JSON.stringify(select.value), JSON.stringify([{value: 'pizza', label: 'Pizza'}]));

  select.$destroy();
});

test('when isMulti is true and all selected items have been removed then placeholder should show and clear all should hide', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [{value: 'chocolate', label: 'Chocolate'}]
    }
  });

  document.querySelector('.multiSelectItem_clear').click();

  select.$destroy();
});

test('when isMulti is true and items are selected then clear all should wipe all selected items', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}]
    }
  });

  document.querySelector('.clearSelect').click();
  t.equal(select.value, undefined);

  select.$destroy();
});

test('when isMulti and groupBy is active then items should be selectable', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items: itemsWithGroup,
      groupBy: (item) => item.group
    }
  });

  target.style.maxWidth = '400px';
  await querySelectorClick('.selectContainer');
  await querySelectorClick('.listItem');
  t.equal(JSON.stringify(select.value), JSON.stringify([{"isGroupItem":true,"value":"chocolate","label":"Chocolate","group":"Sweet"}]));

  select.$destroy();
});

test('when isMulti and selected items reach edge of container then Select height should increase and selected items should wrap to new line', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items
    }
  });

  target.style.maxWidth = '250px';
  t.ok(document.querySelector('.selectContainer').scrollHeight === 42);
  await handleSet(select, {value: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}]});
  t.ok(document.querySelector('.selectContainer').scrollHeight > 44);
  select.$destroy();
});

test('when isMulti and value is populated then navigating with LeftArrow updates activevalue', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}, {value: 'chips', label: 'Chips'},],
      isFocused: true
    }
  });

  target.style.maxWidth = '100%';
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  t.ok(select.$capture_state().activevalue === 1);

  select.$destroy();
});

test('when isMulti and value is populated then navigating with ArrowRight updates activevalue', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}, {value: 'chips', label: 'Chips'},],
      isFocused: true
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowRight'}));
  t.ok(select.$capture_state().activevalue === 1);

  select.$destroy();
});

test('when isMulti and value has items and list opens then first item in list should be active', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      isFocused: true
    }
  });

  await querySelectorClick('.selectContainer');
  await querySelectorClick('.listItem');
  await handleKeyboard('ArrowDown');

  t.ok(document.querySelector('.listItem .hover'));

  select.$destroy();
});

test('when isMulti, isDisabled, and value has items then items should be locked', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      isDisabled: true,
      value: [{value: 'chocolate', label: 'Chocolate'}],
    }
  });

  t.ok(document.querySelector('.multiSelectItem.disabled'));

  select.$destroy();
});

test('when isMulti is true show each item in value if simple arrays are used', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      test: true,
      items: ['pizza', 'chips', 'chocolate'],
      value: ['pizza', 'chocolate']
    }
  });

  const all = target.querySelectorAll('.multiSelectItem .multiSelectItem_label');
  t.ok(all[0].innerHTML === 'pizza');
  t.ok(all[1].innerHTML === 'chocolate');

  select.$destroy();
});

test('when getValue method is set should use that key to update value', async (t) => {
  const select = new Select({
    target,
    props: {
      items: [{id: 0, label: 'ONE'}, {id: 1, label: 'TWO'}],
      value: {id: 0, label: 'ONE'},
      optionIdentifier: 'id'
    }
  });

  t.ok(select.value.id === 0);
  await querySelectorClick('.selectContainer');
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.ok(select.value.id === 1);

  select.$destroy();
});

test('when loadOptions method is supplied and filterText has length then items should populate via promise resolve', async (t) => {
  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',
      Item: CustomItem,
      Selection: CustomItem
    }
  });

  select.$set({filterText: 'Juniper'});
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  select.$destroy();
});

test('when noOptionsMessage is set and there are no items then show message', async (t) => {
  const select = new Select({
    target,
    props: {
      noOptionsMessage: 'SO SO SO SCANDALOUS',
      isFocused: true
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  await wait(0);
  t.ok(document.querySelector('.empty').innerHTML === 'SO SO SO SCANDALOUS');

  select.$destroy();
});

test('when getSelectionLabel method is supplied and value are no items then display result of getSelectionLabel', async (t) => {
 const select = new Select({
    target,
    props: {
      getSelectionLabel: (option) => option.notLabel,
      value: {notLabel: 'This is not a label', value: 'not important'},
    }
  });


  t.ok(document.querySelector('.selection').innerHTML === 'This is not a label');

  select.$destroy();
});

test('when getOptionLabel method and items is supplied then display result of getOptionLabel for each option', async (t) => {
  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.notLabel,
      isFocused: true,
      items: [{notLabel: 'This is not a label', value: 'not important #1'}, {notLabel: 'This is not also not a label', value: 'not important #2'}],
    }
  });

  await handleKeyboard('ArrowDown');
  t.ok(document.querySelector('.item').innerHTML === 'This is not a label');

  select.$destroy();
});

test('when getOptionLabel method and items is supplied then display result of getOptionLabel for each option', async (t) => {
  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.notLabel,
      isFocused: true,
      items: [{notLabel: 'This is not a label', value: 'not important #1'}, {notLabel: 'This is not also not a label', value: 'not important #2'}],
    }
  });

  await handleKeyboard('ArrowDown');
  t.ok(document.querySelector('.item').innerHTML === 'This is not a label');

  select.$destroy();
});


test('when a custom Item component is supplied then use to display each item', async (t) => {
  const select = new Select({
    target,
    props: {
      Item: CustomItem,
      getOptionLabel: (option) => option.name,
      isFocused: true,
      items: [{
        image_url: 'https://images.punkapi.com/v2/keg.png',
        name: 'A Name', tagline: 'A tagline', abv: 'A abv'}],
    }
  });

  await handleKeyboard('ArrowDown');
  t.ok(document.querySelector('.customItem_name').innerHTML === 'A Name');

  select.$destroy();
});

test('when a custom Selection component is supplied then use to display selection', async (t) => {
  const select = new Select({
    target,
    props: {
      Item: CustomItem,
      Selection: CustomItem,
      getOptionLabel: (option) => option.name,
      isFocused: true,
      items: [{
        image_url: 'https://images.punkapi.com/v2/keg.png',
        name: 'A Name', tagline: 'A tagline', abv: 'A abv'}],
    }
  });

  await handleKeyboard('ArrowDown');
  await handleKeyboard('Enter');

  t.ok(document.querySelector('.customItem_name').innerHTML === 'A Name');

  select.$destroy();
});

test('when loadOptions method is supplied, isMulti is true and filterText has length then items should populate via promise resolve', async (t) => {
  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.name,
      getSelectionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',
      Item: CustomItem,
      isMulti: true
    }
  });

  await wait(0);
  await handleSet(select, {filterText: 'Juniper'});
  await wait(600);
  await handleKeyboard('ArrowDown');
  await handleKeyboard('Enter');
  t.ok(document.querySelector('.multiSelectItem_label').innerHTML === 'Juniper Wheat Beer');
  select.$destroy();
});

test('when getSelectionLabel contains HTML then render the HTML', async (t) => {
  const select = new Select({
    target,
    props: {
      value: items[0],
      getSelectionLabel: (option) => `<p>${option.label}</p>`,
    }
  });

  t.ok(document.querySelector('.selection').innerHTML === '<p>Chocolate</p>');

  select.$destroy();
});

test('when getOptionLabel contains HTML then render the HTML', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      getOptionLabel: (option) => `<p>${option.label}</p>`,
      isFocused: true
    }
  });

  await handleKeyboard('ArrowDown');
  t.ok(document.querySelector('.item').innerHTML === '<p>Chocolate</p>');

  select.$destroy();
});

test('when isMulti is true, value populated and arrowLeft is pressed then no items in list should be active', async (t) => {
  const selectMultiSelected = new Select_multiSelected({
    target: testTarget,
  });

  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [
        {value: 'pizza', label: 'Pizza'},
        {value: 'chips', label: 'Chips'},
      ],
      isFocused: true

    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  t.ok(!document.querySelector('.hover'));
  select.$destroy();
  selectMultiSelected.$destroy();
});

test('when hideEmptyState true then do not show "no options" div ', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      listOpen: true,
      filterText: 'x',
      hideEmptyState: true
    }
  });

  await wait(0);

  t.ok(!document.querySelector('.empty'));

  select.$destroy();
});

test('when value changes then select event should fire', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
    }
  });

  let selectEvent = undefined;

  select.$on('select', event => {
    selectEvent = event;
  });

  await handleSet(select, {isFocused: true});
  await handleKeyboard('ArrowDown');
  await handleKeyboard('Enter');

  t.ok(selectEvent);

  select.$destroy();
});

test('when value is cleared the clear event is fired', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: items[0],
    }
  });

  let clearEvent = false;
  select.$on('clear', () => {
    clearEvent = true;
  });

  document.querySelector('.clearSelect').click();
  t.ok(clearEvent);

  select.$destroy();
});

test('when multi item is cleared the clear event is fired with removed item', async (t) => {
  const itemToRemove = items[0];

  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [itemToRemove]
    }
  });

  let removedItem;

  select.$on('clear', (event) => {
    removedItem = event.detail;
  });

  document.querySelector('.multiSelectItem_clear').click();
  t.equal(JSON.stringify(removedItem), JSON.stringify(itemToRemove));

  select.$destroy();
});

test('when items in list filter or update then first item in list should highlight', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isFocused: true
    }
  });

  await handleKeyboard('ArrowDown');
  await handleKeyboard('ArrowDown');
  await handleKeyboard('ArrowDown');

  t.ok(document.querySelector('.hover').innerHTML === 'Cake');
  await handleSet(select, {filterText: 'c'});
  t.ok(document.querySelector('.hover').innerHTML === 'Chocolate');

  select.$destroy();
});

test('when item is selected or state changes then check value[optionIdentifier] has changed before firing "select" event', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {value: 'cake', label: 'Cake'}
    }
  });

  let item = undefined;

  select.$on('select', () => {
    item = true;
  });

  await handleSet(select, {value: {value: 'cake', label: 'Cake'}});

  t.ok(!item);
  select.$destroy();
});

test('when isMulti and item is selected or state changes then check value[optionIdentifier] has changed before firing "select" event', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [
        {value: 'pizza', label: 'Pizza'},
        {value: 'chips', label: 'Chips'},
      ],
    }
  });

  let item = undefined;

  select.$on('select', () => {
    item = true;
  });

  await handleSet(select, {value: [{value: 'pizza', label: 'Pizza'},{value: 'chips', label: 'Chips'}]});
  t.ok(!item);
  item = false;
  await handleSet(select, {value: [{value: 'pizza', label: 'Pizza'}]});

  t.ok(item);
  select.$destroy();
});

test('when isFocused turns to false then check Select is no longer in focus', async (t) => {
  const select = new Select({
    target,
    props: {
      isFocused: true,
      items,
    }
  });

  const selectSecond = new Select({
    target: extraTarget,
    props: {
      isFocused: false,
      items,
    }
  });

  select.$on('select', () => {
    setTimeout(() => {
      select.$set({
        isFocused: false,
      });
    }, 0);

    selectSecond.$set({
      isFocused: true
    });
  });

  await handleSet(select, {value: {value: 'pizza', label: 'Pizza'}});


  await wait(0);

  t.ok(selectSecond.isFocused);
  t.ok(!select.isFocused);

  selectSecond.$destroy();
  select.$destroy();
});

test('when items and loadOptions method are both supplied then fallback to items until filterText changes', async (t) => {
  const items = [{name: 'test1', id: 0}, {name: 'test2', id: 1}, {name: 'test3', id: 2}];

  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.name,
      getSelectionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',
      items,
      isFocused: true,
      listOpen: true
    }
  });

  select.$on('state', ({current, changed}) => {
    if (changed.filterText && current.filterText === '' && !current.value) {
      select.$set({
        items
      });
    }
  });

  await wait(0);
  t.ok(document.querySelector('.item').innerHTML === 'test1');
  await handleSet(select, {filterText: 'Juniper'});
  await wait(500);
  t.ok(document.querySelector('.item').innerHTML === 'Juniper Wheat Beer');
  await handleSet(select, {filterText: ''});
  t.ok(document.querySelector('.item').innerHTML === 'test1');

  select.$destroy();
});

test('when items is just an array of strings then render list', async (t) => {
  const items = ['one', 'two', 'three'];

  const select = new Select({
    target,
    props: {
      items,
      listOpen: true
    }
  });

  await wait(0);
  t.ok(document.querySelector('.item').innerHTML === 'one');

  select.$destroy();
});

test('when items are just strings then value should render', async (t) => {
  const items = ['one', 'two', 'three'];

  const select = new Select({
    target,
    props: {
      items,
      value: {value: 'one', label: 'one', index: 0}
    }
  });

  t.ok(document.querySelector('.selection').innerHTML === 'one');
  select.$destroy();
});

test('when isVirtualList then render list', async (t) => {
  function fill(len, fn) {
    return Array(len).fill().map((_, i) => fn(i));
  }

  const items = fill(10000, (i) => {
      const name = nameyMcNameface();
      return name
  });

  const select = new Select({
    target,
    props: {
      items,
      isVirtualList: true,
      listOpen: true
    }
  });

  await wait(0);
  t.ok(document.querySelector('.listItem'));

  select.$destroy();
});

test('when isVirtualList and filterText changes then rendered list scrolls to top', async (t) => {
  function fill(len, fn) {
    return Array(len).fill().map((_, i) => fn(i));
  }

  const items = fill(10000, (i) => {
      const name = nameyMcNameface();
      return name
  });

  const select = new Select({
    target,
    props: {
      items,
      isVirtualList: true,
      listOpen: true
    }
  });

  await wait(0);
  const virtual = document.querySelector('svelte-virtual-list-viewport');
  virtual.scrollTop = 120000;

  select.$set({
    filterText: 'swift'
  });

  await wait(0);
  t.ok(virtual.scrollTop === 0);

  select.$destroy();
});

test('when loadOptions method is supplied but filterText is empty then do not run loadOptions and clean list', async (t) => {
  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',
      Item: CustomItem,
      Selection: CustomItem
    }
  });

  await wait(0);
  select.$set({filterText: 'Juniper'});
  await wait(500);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.ok(document.querySelector('.customItem_name').innerHTML === 'Juniper Wheat Beer');
  select.$set({value: undefined, filterText: ''});
  await wait(0);
  select.$set({listOpen: true});
  await wait(0);
  t.ok(document.querySelector('.empty'));

  select.$destroy();
});

test('when isMulti and value has items then check each item is unique', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [
        {value: 'pizza', label: 'Pizza'},
        {value: 'pizza', label: 'Pizza'},
        {value: 'cake', label: 'Cake'},
      ],
    }
  });

  t.ok(select.value.length === 2);

  select.$destroy();
});

test('when isMulti and textFilter has length then enter should select item', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      isFocused: true,
      filterText: 'p',
      listOpen: true
    }
  });

  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.ok(select.value[0].value === 'pizza');

  select.$destroy();
});

test('when isMulti and textFilter has length and no items in list then enter should do nothing', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      isFocused: true,
      filterText: 'zc',
      listOpen: true
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.ok(select.value === undefined);

  select.$destroy();
});

test('When isMulti and no selected item then delete should do nothing', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      isFocused: true,
      listOpen: true
    }
  });

  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Backspace'}));
  t.ok(select.listOpen === true);

  select.$destroy();
});

test('When list is open, filterText applied and Enter/Tab key pressed should select and show highlighted value', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      isFocused: true,
      filterText: 'A5',
      items: ['A5', 'test string', 'something else']
    }
  });

  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.equal(select.value.value, 'A5');
  await wait(0);
  t.ok(target.querySelector('.selectedItem .selection').innerHTML === 'A5');

  select.$destroy();
});


test('When inputAttributes is supplied each attribute is placed on the Select input field', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      inputAttributes: {
        id: 'testId',
        autocomplete: 'custom-value'
      }
    }
  });

  const el = document.getElementById('testId');

  t.equal(el.id, 'testId');
  t.equal(el.getAttribute('autocomplete'), 'custom-value');

  select.$destroy();
});

test('when items and value supplied as just strings then value should render correctly', async (t) => {
  const select = new Select({
    target,
    props: {
      items: ['Pizza', 'Chocolate', 'Crisps'],
      value: 'Pizza'
    }
  });

  t.equal(document.querySelector('.selectedItem .selection').innerHTML, 'Pizza');

  select.$destroy();
});

test('when isMulti with items and value supplied as just strings then value should render correctly', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items: ['Pizza', 'Chocolate', 'Crisps'],
      value: ['Pizza']
    }
  });

  t.equal(document.querySelector('.multiSelectItem_label').innerHTML, 'Pizza');

  select.$destroy();
});

test('when isMulti, groupBy and value are supplied then list should be filtered', async (t) => {
  let _items = [
    { id: 1, name: "Foo", group: "first" },
    { id: 2, name: "Bar", group: "second" },
    { id: 3, name: "Baz", group: "second" },
    { id: 4, name: "Qux", group: "first" }
  ];

  const select = new Select({
    target,
    props: {
      isMulti: true,
      items: _items,
      groupBy: (item) => item.group,
      optionIdentifier: 'id',
      getSelectionLabel: (item) => item.name,
      getOptionLabel: (item) => item.name,
      value: [{ id: 2, name: "Bar", group: "second" }],
      listOpen: true
    }
  });

  t.ok(!select.filteredItems.find(item => item.name === 'Bar'));

  select.$destroy();
});

test('When isCreatable disabled, creator is not displayed', async (t) => {
  const filterText = 'abc';

  const select = new Select({
    target,
    props: {
      items,
      isFocused: true,
      listOpen: true
    }
  });

  select.$set({ filterText });

  await wait(0);

  t.ok(document.querySelector('.listContainer > .empty'));

  select.$destroy();
});

test('When isCreatable enabled, creator displays getOptionLabel for isCreator', async (t) => {
  const filterText = 'abc_XXXX';

  function getOptionLabel(item, filterText) {
    return item.isCreator ? `Wanna add ${filterText}?`: item.label;
  }

  const creatorItem = { label: filterText, value: filterText, isCreator: true };

  const select = new Select({
    target,
    props: {
      items,
      isCreatable: true,
      isFocused: true,
      listOpen: true,
      getOptionLabel
    }
  });

  await wait(0);
  select.$set({ filterText });
  await wait(0);
  const listItems = document.querySelectorAll('.listContainer > .listItem');
  t.equal(listItems[listItems.length - 1].querySelector('.item').innerHTML, getOptionLabel(creatorItem, filterText));

  select.$destroy();
});

test('When isCreatable enabled, creator is not displayed when duplicate item value in item list', async (t) => {
  const dupeValueForCheck = 'xxxxxx';
  const item = {
    value: dupeValueForCheck,
    label: dupeValueForCheck
  };

  const select = new Select({
    target,
    props: {
      items: [item],
      isCreatable: true,
      listOpen: true
    }
  });

  await wait(0);
  select.$set({ filterText: dupeValueForCheck });
  await wait(0);

  const listItems = document.querySelectorAll('.listContainer > .listItem');
  t.equal(listItems[listItems.length - 1].querySelector('.item').innerHTML, dupeValueForCheck);

  select.$destroy();
});

test('When creator selected, selected item is set to created item', async (t) => {
  const filterText = 'abc';

  const select = new Select({
    target,
    props: {
      items,
      isCreatable: true,
      isFocused: true,
      listOpen: true
    }
  });

  await wait(0);
  select.$set({ filterText });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  const { value } = select;
  t.ok(value.value === 'abc');
  t.ok(value.label === 'abc');

  select.$destroy();
});

test('When creator is selected, created item it added to multi selection', async (t) => {
  const filterText = 'abc';

  const select = new Select({
    target,
    props: {
      items,
      isCreatable: true,
      isFocused: true,
      listOpen: true,
      isMulti: true
    }
  });

  await wait(0);
  select.$set({ filterText });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  const { value } = select;
  t.ok(value[0].value === 'abc');
  t.ok(value[0].label === 'abc');

  select.$destroy();
});

test('When creator is selected multiple times, items are all added to multi selection', async (t) => {
  const filterTextForItem1 = 'abc';
  const filterTextForItem2 = 'def';

  const select = new Select({
    target,
    props: {
      items,
      isCreatable: true,
      isFocused: true,
      listOpen: true,
      isMulti: true
    }
  });

  select.$set({ filterText: filterTextForItem1 });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);
  t.ok(select.value[0].value === 'abc');

  select.$set({ filterText: filterTextForItem2 });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);
  t.ok(select.value[1].value === 'def');

  select.$destroy();
});

test('When isMulti and an items remove icon is clicked then item should be removed from value', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isCreatable: true,
      value: [
        {value: 'pizza', label: 'Pizza'},
        {value: 'cake', label: 'Cake'},
      ],
      isMulti: true
    }
  });

  await querySelectorClick('.multiSelectItem_clear');
  t.ok(select.value[0].value === 'cake');
  await querySelectorClick('.multiSelectItem_clear');
  t.ok(select.value === undefined);

  select.$destroy();
});

test('When isCreatable with non-default item structure, item creator displays getCreatorLabel label for isCreator', async (t) => {
  const _items = [
    {country: 'Italy', food: 'Pizza'},
    {country: 'Australia', food: 'Meat Pie'},
    {country: 'China', food: 'Fried Rice'}
  ];

  const filterText = 'Fried Chicken Roll';

  function creatorLabel(filterText) {
    return `Do you want to create ${ filterText } as an added food?`;
  }

  function itemDisplay(item, filterText) {
    return item.isCreator ? creatorLabel(filterText) : `${item.food} (${item.country})`;
  }

  const select = new Select({
    target,
    props: {
      optionIdentifier: 'food',
      getOptionLabel: itemDisplay,
      getSelectionLabel: itemDisplay,
      items: _items,
      isCreatable: true,
      createItem(filterText) {
        return {
          food: filterText,
          country: 'Added'
        };
      }
    }
  });

  await wait(0);
  select.$set({ filterText });
  await wait(0);
  const listItems = document.querySelectorAll('.listContainer > .listItem');
  t.equal(listItems[listItems.length - 1].querySelector('.item').innerHTML, creatorLabel(filterText));

  select.$destroy();
});

test('When isCreatable and isMulti and optionIdentifier is supplied creator displays getCreatorLabel label', async (t) => {
  const filterText = 'abc';
  const _items = [
    {foo: 'chocolate', label: 'Chocolate'},
    {foo: 'pizza', label: 'Pizza'}
  ];

  const select = new Select({
    target,
    props: {
      optionIdentifier: 'foo',
      isMulti: true,
      items: _items,
      isCreatable: true
    }
  });

  await wait(0);
  select.$set({ filterText });
  await wait(0);
  const listItems = document.querySelectorAll('.listContainer > .listItem');
  t.equal(listItems[listItems.length - 1].querySelector('.item').innerHTML, `Create \"${ filterText }\"`);

  select.$destroy();
});

test('When isCreatable and isMulti and optionIdentifier is supplied multiple creatable items can be added', async (t) => {
  const filterText = 'foo';
  const filterText2 = 'bar';

  const _items = [
    {id: 1, tag_name: 'Banana'},
    {id: 5, tag_name: 'Orange'},
    {id: 4, tag_name: 'Tree'},
    {id: 3, tag_name: 'Guns'},
    {id: 2, tag_name: 'Cars'},
  ];

  const optionIdentifier = 'tag_name';
  const getOptionLabel = (option) => option.tag_name;
  const getSelectionLabel = (option) => option.tag_name;
  const createItem = (filterText) => ({id:undefined, tag_name:filterText});

  const select = new Select({
    target,
    props: {
      optionIdentifier,
      isMulti: true,
      items: _items,
      isCreatable: true,
      getOptionLabel,
      getSelectionLabel,
      createItem,
    }
  });

  await wait(0);
  select.$set({ filterText });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);
  select.$set({ filterText: filterText2 });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);

  t.ok(select.value.length === 2);
  t.ok(select.value[0].tag_name);

  select.$destroy();
});

test('When isCreatable and item is created then createItem method should only run once', async (t) => {
  let createItemRun = 0;
  const createItem = (filterText) => {
    createItemRun += 1;
    return {
      value: filterText,
      label: filterText
    };
  };

  const select = new Select({
    target,
    props: {
      isCreatable: true,
      items,
      createItem
    }
  });

  await wait(0);
  select.$set({ filterText: 'foo' });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  t.ok(createItemRun === 2);

  select.$destroy();
});

test('When items are collection and value a string then lookup item using optionIdentifier and update value to match', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: 'cake'
    }
  });

  await wait(0);
  t.ok(select.value.value === 'cake');
  select.$set({ value: 'pizza' });
  await wait(0);
  t.ok(select.value.value === 'pizza');
  select.$destroy();
});

test('When listAutoWidth is set to false list container should have style of width:100%', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      listAutoWidth: false,
      listOpen: true
    }
  });

  await wait(0);
  const listWidth = document.querySelectorAll('.selectContainer > div')[0].style.width;
  t.ok(listWidth === '100%');
  select.$destroy();
});


test('When item is already active and is selected from list then close list', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      listOpen: true,
      value: 'pizza'
    }
  });

  await wait(0);
  await querySelectorClick('.listContainer > .listItem > .item.active');
  await wait(0);
  t.ok(select.value.value === 'pizza');
  select.$destroy();
});


test('When Icon prop is supplied then render on Select', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      Icon: TestIcon
    }
  });

  t.ok(document.querySelectorAll('#testIcon')[0]);

  select.$destroy();
});

test('When showChevron prop is true only show chevron when there is no value on Select', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {value: 'chocolate', label: 'Chocolate'},
      showChevron: true
    }
  });

  t.ok(document.querySelectorAll('.indicator').length === 0);

  select.$destroy();
});

test('When showChevron prop is true and no value show chevron on Select', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      showChevron: true
    }
  });

  t.ok(document.querySelectorAll('.indicator')[0]);

  select.$destroy();
});

test('When showIndicator prop is true always show chevron on Select', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {value: 'chocolate', label: 'Chocolate'},
      showIndicator: true
    }
  });

  t.ok(document.querySelectorAll('.indicator')[0]);

  select.$destroy();
});

test('When items and loadItems then listOpen should be false', async (t) => {
  const select = new Select({
    target,
    props: {
      getSelectionLabel: (option) => option.name,
      getOptionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',
      items: [{
        id: 1,
        name: 'Initial Items #1'
      }]

    }
  });

  t.ok(select.listOpen === false);

  select.$destroy();
});

test('Select container classes can be injected', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: { name: 'Item #2' },
      containerClasses: 'testclass',
    },
  });

  t.ok(
    document.querySelector('.selectContainer').classList.contains('testclass')
  );
  select.$destroy();
});


test('When noOptionsMessage is changed after List component has been created then propagate update', async (t) => {
  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',
      Item: CustomItem,
      Selection: CustomItem,
      noOptionsMessage: 'FIRST'
    },
  });

  await wait(0);
  select.$set({listOpen: true});
  await wait(0);
  t.ok(document.querySelector('.empty').innerHTML === 'FIRST');
  select.$set({noOptionsMessage: 'SECOND'});
  await wait(0);
  t.ok(document.querySelector('.empty').innerHTML === 'SECOND');
  select.$set({filterText: 'sdfsf ssdfsdfs fs'});
  select.$set({noOptionsMessage: 'THIRD'});
  await wait(0);
  t.ok(document.querySelector('.empty').innerHTML === 'THIRD');

  select.$destroy();
});


test('When loadOptions promise is resolved then dispatch loaded', async (t) => {
  const select = new Select({
    target,
    props: {
      loadOptions: resolvePromise,
    },
  });

  let loadedEventData = undefined;
  const loadedOff = select.$on('loaded', event => {
    loadedEventData = event;
  });
  let errorEventData = undefined;
  const errorOff = select.$on('error', event => {
    errorEventData = event;
  });

  await wait(0);
  select.$set({listOpen: true});
  await wait(0);
  select.$set({filterText: 'test'});
  await wait(500);
  t.arrayEqual(loadedEventData.detail.items, ['a', 'b', 'c']);
  t.equal(errorEventData, undefined);

  loadedOff();
  errorOff();
  select.$destroy();
});

test('When loadOptions promise is rejected then dispatch error', async (t) => {
  const select = new Select({
    target,
    props: {
      loadOptions: rejectPromise,
    },
  });

  let loadedEventData = undefined;
  const loadedOff = select.$on('loaded', event => {
    loadedEventData = event;
  });
  let errorEventData = undefined;
  const errorOff = select.$on('error', event => {
    errorEventData = event;
  });

  await wait(0);
  select.$set({listOpen: true});
  await wait(0);
  select.$set({filterText: 'test'});
  await wait(500);
  t.equal(loadedEventData, undefined);
  t.equal(errorEventData.detail.type, 'loadOptions');
  t.equal(errorEventData.detail.details, 'error 123');

  loadedOff();
  errorOff();
  select.$destroy();
});

test('When items change then value should also update', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {value: 'chips', label: 'Chips'},
    },
  });

  await wait(0);

  select.$set({items: [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'pizza', label: 'Pizza'},
    {value: 'cake', label: 'Cake'},
    {value: 'chips', label: 'Loaded Fries'},
    {value: 'ice-cream', label: 'Ice Cream'},
  ]});

  await wait(0);

  t.ok(select.value.label === 'Loaded Fries');
  t.ok(target.querySelector('.selectedItem .selection').innerHTML === 'Loaded Fries');

  select.$destroy();

  await wait(0);

  const multiSelect = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [{value: 'chips', label: 'Chips'}, {value: 'pizza', label: 'Pizza'}],
    },
  });

  await wait(0);

  multiSelect.$set({items: [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'pizza', label: 'Cheese Pizza'},
    {value: 'cake', label: 'Cake'},
    {value: 'chips', label: 'Loaded Fries'},
    {value: 'ice-cream', label: 'Ice Cream'},
  ]});

  await wait(0);

  t.ok(multiSelect.value[0].label === 'Loaded Fries');
  t.ok(multiSelect.value[1].label === 'Cheese Pizza');

  multiSelect.$destroy();
});

test('When items change then value should also update but only if found in items', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {value: 'chips', label: 'Chips'},
    },
  });

  await wait(0);

  select.$set({items: [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'pizza', label: 'Pizza'},
    {value: 'cake', label: 'Cake'},
    {value: 'loaded-fries', label: 'Loaded Fries'},
    {value: 'ice-cream', label: 'Ice Cream'},
  ]});

  await wait(0);

  t.ok(select.value.label === 'Chips');
  t.ok(target.querySelector('.selectedItem .selection').innerHTML === 'Chips');

  select.$destroy();
});

test('When isMulti and multiFullItemClearable then clicking anywhere on the item will remove item', async (t) => {
  const multiSelect = new Select({
    target,
    props: {
      isMulti: true,
      items,
      multiFullItemClearable: true,
      value: [{value: 'chips', label: 'Chips'}, {value: 'pizza', label: 'Pizza'}],
    },
  });

  await wait(0);
  await querySelectorClick('.multiSelectItem');
  await wait(0);
  t.ok(multiSelect.value[0].label === 'Pizza');
  
  multiSelect.$destroy();
});

test('when loadOptions and items is supplied then list should close on blur', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let items=[{value:1, label:1}, {value:2, label:2}];
	let loadOptions = async(filterText) => {
		const res = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${filterText}`);
		const data = await res.json();    
    return data.map((beer)=> ({value: beer.id, label: beer.name}));
	};

  const select = new Select({
    target,
    props: {
      items,
      loadOptions,
    }
  });

  select.$set({isFocused: true});
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  await wait(0);
  select.$set(({ filterText: 's'}));
  await wait(600);
  div.click();
  div.remove();

  select.$destroy();
});



test('when isCreatable and item created then event "itemCreated" should dispatch', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isCreatable: true,
      isFocused: true,
      listOpen: true,
      isMulti: true
    }
  });
  
  let eventDetail;
  select.$on('itemCreated', (event) => {
    eventDetail = event.detail;
  });

  select.$set({ filterText: 'TestCreate' });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);
  t.ok(eventDetail === 'TestCreate');

  select.$destroy();
});

async function getCancelledRes() {
}

test('when loadOptions response returns cancelled true then dont end loading state', async (t) => {
  const select = new Select({
    target,
    props: {
      loadOptions: getCancelledRes,
    }
  });

  select.$set({filterText: 'Juniper'});
  await wait(0);
  

  select.$destroy();
});

test('when ClearItem replace clear icon', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      ClearIcon: TestClearIcon,
      value: {value: 'chips', label: 'Chips'}
    }
  });
  
  t.ok(target.querySelector('.testClearIcon'));

  select.$destroy();
});


function getPosts(filterText) {
  filterText = filterText ? filterText.replace(' ','_') : '';

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.punkapi.com/v2/beers?beer_name=${filterText}`);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setTimeout(resolve(JSON.parse(xhr.response).sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
        })), 2000);
      } else {
        reject();
      }
    };
  });
}

function resolvePromise() {
  return new Promise((resolve, reject) => {
    resolve(['a', 'b', 'c']);
  })
}

function rejectPromise() {
  return new Promise((resolve, reject) => {
    reject('error 123');
  })
}

// this allows us to close puppeteer once tests have completed
window.done = done;

var index = {};

/* src/VirtualList.svelte generated by Svelte v3.35.0 */
const file = "src/VirtualList.svelte";

function add_css() {
	var style = element("style");
	style.id = "svelte-g2cagw-style";
	style.textContent = "svelte-virtual-list-viewport.svelte-g2cagw{position:relative;overflow-y:auto;-webkit-overflow-scrolling:touch;display:block}svelte-virtual-list-contents.svelte-g2cagw,svelte-virtual-list-row.svelte-g2cagw{display:block}svelte-virtual-list-row.svelte-g2cagw{overflow:hidden}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlydHVhbExpc3Quc3ZlbHRlIiwic291cmNlcyI6WyJWaXJ0dWFsTGlzdC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgICBpbXBvcnQgeyBvbk1vdW50LCB0aWNrIH0gZnJvbSAnc3ZlbHRlJztcblxuICAgIGV4cG9ydCBsZXQgaXRlbXMgPSB1bmRlZmluZWQ7XG4gICAgZXhwb3J0IGxldCBoZWlnaHQgPSAnMTAwJSc7XG4gICAgZXhwb3J0IGxldCBpdGVtSGVpZ2h0ID0gNDA7XG4gICAgZXhwb3J0IGxldCBob3Zlckl0ZW1JbmRleCA9IDA7XG4gICAgZXhwb3J0IGxldCBzdGFydCA9IDA7XG4gICAgZXhwb3J0IGxldCBlbmQgPSAwO1xuXG4gICAgbGV0IGhlaWdodF9tYXAgPSBbXTtcbiAgICBsZXQgcm93cztcbiAgICBsZXQgdmlld3BvcnQ7XG4gICAgbGV0IGNvbnRlbnRzO1xuICAgIGxldCB2aWV3cG9ydF9oZWlnaHQgPSAwO1xuICAgIGxldCB2aXNpYmxlO1xuICAgIGxldCBtb3VudGVkO1xuXG4gICAgbGV0IHRvcCA9IDA7XG4gICAgbGV0IGJvdHRvbSA9IDA7XG4gICAgbGV0IGF2ZXJhZ2VfaGVpZ2h0O1xuXG4gICAgJDogdmlzaWJsZSA9IGl0ZW1zLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcCgoZGF0YSwgaSkgPT4ge1xuICAgICAgICByZXR1cm4geyBpbmRleDogaSArIHN0YXJ0LCBkYXRhIH07XG4gICAgfSk7XG5cbiAgICAkOiBpZiAobW91bnRlZCkgcmVmcmVzaChpdGVtcywgdmlld3BvcnRfaGVpZ2h0LCBpdGVtSGVpZ2h0KTtcblxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlZnJlc2goaXRlbXMsIHZpZXdwb3J0X2hlaWdodCwgaXRlbUhlaWdodCkge1xuICAgICAgICBjb25zdCB7IHNjcm9sbFRvcCB9ID0gdmlld3BvcnQ7XG5cbiAgICAgICAgYXdhaXQgdGljaygpO1xuXG4gICAgICAgIGxldCBjb250ZW50X2hlaWdodCA9IHRvcCAtIHNjcm9sbFRvcDtcbiAgICAgICAgbGV0IGkgPSBzdGFydDtcblxuICAgICAgICB3aGlsZSAoY29udGVudF9oZWlnaHQgPCB2aWV3cG9ydF9oZWlnaHQgJiYgaSA8IGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHJvdyA9IHJvd3NbaSAtIHN0YXJ0XTtcblxuICAgICAgICAgICAgaWYgKCFyb3cpIHtcbiAgICAgICAgICAgICAgICBlbmQgPSBpICsgMTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aWNrKCk7XG4gICAgICAgICAgICAgICAgcm93ID0gcm93c1tpIC0gc3RhcnRdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByb3dfaGVpZ2h0ID0gKGhlaWdodF9tYXBbaV0gPSBpdGVtSGVpZ2h0IHx8IHJvdy5vZmZzZXRIZWlnaHQpO1xuICAgICAgICAgICAgY29udGVudF9oZWlnaHQgKz0gcm93X2hlaWdodDtcbiAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVuZCA9IGk7XG5cbiAgICAgICAgY29uc3QgcmVtYWluaW5nID0gaXRlbXMubGVuZ3RoIC0gZW5kO1xuICAgICAgICBhdmVyYWdlX2hlaWdodCA9ICh0b3AgKyBjb250ZW50X2hlaWdodCkgLyBlbmQ7XG5cbiAgICAgICAgYm90dG9tID0gcmVtYWluaW5nICogYXZlcmFnZV9oZWlnaHQ7XG4gICAgICAgIGhlaWdodF9tYXAubGVuZ3RoID0gaXRlbXMubGVuZ3RoO1xuXG4gICAgICAgIGlmICh2aWV3cG9ydCkgdmlld3BvcnQuc2Nyb2xsVG9wID0gMDtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBoYW5kbGVfc2Nyb2xsKCkge1xuICAgICAgICBjb25zdCB7IHNjcm9sbFRvcCB9ID0gdmlld3BvcnQ7XG5cbiAgICAgICAgY29uc3Qgb2xkX3N0YXJ0ID0gc3RhcnQ7XG5cbiAgICAgICAgZm9yIChsZXQgdiA9IDA7IHYgPCByb3dzLmxlbmd0aDsgdiArPSAxKSB7XG4gICAgICAgICAgICBoZWlnaHRfbWFwW3N0YXJ0ICsgdl0gPSBpdGVtSGVpZ2h0IHx8IHJvd3Nbdl0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgeSA9IDA7XG5cbiAgICAgICAgd2hpbGUgKGkgPCBpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd19oZWlnaHQgPSBoZWlnaHRfbWFwW2ldIHx8IGF2ZXJhZ2VfaGVpZ2h0O1xuICAgICAgICAgICAgaWYgKHkgKyByb3dfaGVpZ2h0ID4gc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBpO1xuICAgICAgICAgICAgICAgIHRvcCA9IHk7XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgeSArPSByb3dfaGVpZ2h0O1xuICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKGkgPCBpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHkgKz0gaGVpZ2h0X21hcFtpXSB8fCBhdmVyYWdlX2hlaWdodDtcbiAgICAgICAgICAgIGkgKz0gMTtcblxuICAgICAgICAgICAgaWYgKHkgPiBzY3JvbGxUb3AgKyB2aWV3cG9ydF9oZWlnaHQpIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZW5kID0gaTtcblxuICAgICAgICBjb25zdCByZW1haW5pbmcgPSBpdGVtcy5sZW5ndGggLSBlbmQ7XG4gICAgICAgIGF2ZXJhZ2VfaGVpZ2h0ID0geSAvIGVuZDtcblxuICAgICAgICB3aGlsZSAoaSA8IGl0ZW1zLmxlbmd0aCkgaGVpZ2h0X21hcFtpKytdID0gYXZlcmFnZV9oZWlnaHQ7XG4gICAgICAgIGJvdHRvbSA9IHJlbWFpbmluZyAqIGF2ZXJhZ2VfaGVpZ2h0O1xuXG4gICAgICAgIGlmIChzdGFydCA8IG9sZF9zdGFydCkge1xuICAgICAgICAgICAgYXdhaXQgdGljaygpO1xuXG4gICAgICAgICAgICBsZXQgZXhwZWN0ZWRfaGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIGxldCBhY3R1YWxfaGVpZ2h0ID0gMDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgb2xkX3N0YXJ0OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAocm93c1tpIC0gc3RhcnRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkX2hlaWdodCArPSBoZWlnaHRfbWFwW2ldO1xuICAgICAgICAgICAgICAgICAgICBhY3R1YWxfaGVpZ2h0ICs9IGl0ZW1IZWlnaHQgfHwgcm93c1tpIC0gc3RhcnRdLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGQgPSBhY3R1YWxfaGVpZ2h0IC0gZXhwZWN0ZWRfaGVpZ2h0O1xuICAgICAgICAgICAgdmlld3BvcnQuc2Nyb2xsVG8oMCwgc2Nyb2xsVG9wICsgZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdW50KCgpID0+IHtcbiAgICAgICAgcm93cyA9IGNvbnRlbnRzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzdmVsdGUtdmlydHVhbC1saXN0LXJvdycpO1xuICAgICAgICBtb3VudGVkID0gdHJ1ZTtcbiAgICB9KTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gICAgc3ZlbHRlLXZpcnR1YWwtbGlzdC12aWV3cG9ydCB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgICAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG5cbiAgICBzdmVsdGUtdmlydHVhbC1saXN0LWNvbnRlbnRzLFxuICAgIHN2ZWx0ZS12aXJ0dWFsLWxpc3Qtcm93IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuXG4gICAgc3ZlbHRlLXZpcnR1YWwtbGlzdC1yb3cge1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIH1cbjwvc3R5bGU+XG5cbjxzdmVsdGUtdmlydHVhbC1saXN0LXZpZXdwb3J0XG4gICAgYmluZDp0aGlzPXt2aWV3cG9ydH1cbiAgICBiaW5kOm9mZnNldEhlaWdodD17dmlld3BvcnRfaGVpZ2h0fVxuICAgIG9uOnNjcm9sbD17aGFuZGxlX3Njcm9sbH1cbiAgICBzdHlsZT1cImhlaWdodDoge2hlaWdodH07XCJcbj5cbiAgICA8c3ZlbHRlLXZpcnR1YWwtbGlzdC1jb250ZW50c1xuICAgICAgICBiaW5kOnRoaXM9e2NvbnRlbnRzfVxuICAgICAgICBzdHlsZT1cInBhZGRpbmctdG9wOiB7dG9wfXB4OyBwYWRkaW5nLWJvdHRvbToge2JvdHRvbX1weDtcIlxuICAgID5cbiAgICAgICAgeyNlYWNoIHZpc2libGUgYXMgcm93IChyb3cuaW5kZXgpfVxuICAgICAgICAgICAgPHN2ZWx0ZS12aXJ0dWFsLWxpc3Qtcm93PlxuICAgICAgICAgICAgICAgIDxzbG90IGl0ZW09e3Jvdy5kYXRhfSBpPXtyb3cuaW5kZXh9IHtob3Zlckl0ZW1JbmRleH1cbiAgICAgICAgICAgICAgICAgICAgPk1pc3NpbmcgdGVtcGxhdGU8L3Nsb3RcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICA8L3N2ZWx0ZS12aXJ0dWFsLWxpc3Qtcm93PlxuICAgICAgICB7L2VhY2h9XG4gICAgPC9zdmVsdGUtdmlydHVhbC1saXN0LWNvbnRlbnRzPlxuPC9zdmVsdGUtdmlydHVhbC1saXN0LXZpZXdwb3J0PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThISSw0QkFBNEIsY0FBQyxDQUFDLEFBQzFCLFFBQVEsQ0FBRSxRQUFRLENBQ2xCLFVBQVUsQ0FBRSxJQUFJLENBQ2hCLDBCQUEwQixDQUFFLEtBQUssQ0FDakMsT0FBTyxDQUFFLEtBQUssQUFDbEIsQ0FBQyxBQUVELDBDQUE0QixDQUM1Qix1QkFBdUIsY0FBQyxDQUFDLEFBQ3JCLE9BQU8sQ0FBRSxLQUFLLEFBQ2xCLENBQUMsQUFFRCx1QkFBdUIsY0FBQyxDQUFDLEFBQ3JCLFFBQVEsQ0FBRSxNQUFNLEFBQ3BCLENBQUMifQ== */";
	append_dev(document.head, style);
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[23] = list[i];
	return child_ctx;
}

const get_default_slot_changes = dirty => ({
	item: dirty & /*visible*/ 32,
	i: dirty & /*visible*/ 32,
	hoverItemIndex: dirty & /*hoverItemIndex*/ 2
});

const get_default_slot_context = ctx => ({
	item: /*row*/ ctx[23].data,
	i: /*row*/ ctx[23].index,
	hoverItemIndex: /*hoverItemIndex*/ ctx[1]
});

// (157:21) Missing template
function fallback_block(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Missing template");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: fallback_block.name,
		type: "fallback",
		source: "(157:21) Missing template",
		ctx
	});

	return block;
}

// (154:8) {#each visible as row (row.index)}
function create_each_block(key_1, ctx) {
	let svelte_virtual_list_row;
	let t;
	let current;
	const default_slot_template = /*#slots*/ ctx[15].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], get_default_slot_context);
	const default_slot_or_fallback = default_slot || fallback_block(ctx);

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			svelte_virtual_list_row = element("svelte-virtual-list-row");
			if (default_slot_or_fallback) default_slot_or_fallback.c();
			t = space();
			set_custom_element_data(svelte_virtual_list_row, "class", "svelte-g2cagw");
			add_location(svelte_virtual_list_row, file, 154, 12, 3784);
			this.first = svelte_virtual_list_row;
		},
		m: function mount(target, anchor) {
			insert_dev(target, svelte_virtual_list_row, anchor);

			if (default_slot_or_fallback) {
				default_slot_or_fallback.m(svelte_virtual_list_row, null);
			}

			append_dev(svelte_virtual_list_row, t);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope, visible, hoverItemIndex*/ 16418) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[14], dirty, get_default_slot_changes, get_default_slot_context);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot_or_fallback, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot_or_fallback, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svelte_virtual_list_row);
			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(154:8) {#each visible as row (row.index)}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let svelte_virtual_list_viewport;
	let svelte_virtual_list_contents;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let svelte_virtual_list_viewport_resize_listener;
	let current;
	let mounted;
	let dispose;
	let each_value = /*visible*/ ctx[5];
	validate_each_argument(each_value);
	const get_key = ctx => /*row*/ ctx[23].index;
	validate_each_keys(ctx, each_value, get_each_context, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	const block = {
		c: function create() {
			svelte_virtual_list_viewport = element("svelte-virtual-list-viewport");
			svelte_virtual_list_contents = element("svelte-virtual-list-contents");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			set_style(svelte_virtual_list_contents, "padding-top", /*top*/ ctx[6] + "px");
			set_style(svelte_virtual_list_contents, "padding-bottom", /*bottom*/ ctx[7] + "px");
			set_custom_element_data(svelte_virtual_list_contents, "class", "svelte-g2cagw");
			add_location(svelte_virtual_list_contents, file, 149, 4, 3598);
			set_style(svelte_virtual_list_viewport, "height", /*height*/ ctx[0]);
			set_custom_element_data(svelte_virtual_list_viewport, "class", "svelte-g2cagw");
			add_render_callback(() => /*svelte_virtual_list_viewport_elementresize_handler*/ ctx[18].call(svelte_virtual_list_viewport));
			add_location(svelte_virtual_list_viewport, file, 143, 0, 3437);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, svelte_virtual_list_viewport, anchor);
			append_dev(svelte_virtual_list_viewport, svelte_virtual_list_contents);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(svelte_virtual_list_contents, null);
			}

			/*svelte_virtual_list_contents_binding*/ ctx[16](svelte_virtual_list_contents);
			/*svelte_virtual_list_viewport_binding*/ ctx[17](svelte_virtual_list_viewport);
			svelte_virtual_list_viewport_resize_listener = add_resize_listener(svelte_virtual_list_viewport, /*svelte_virtual_list_viewport_elementresize_handler*/ ctx[18].bind(svelte_virtual_list_viewport));
			current = true;

			if (!mounted) {
				dispose = listen_dev(svelte_virtual_list_viewport, "scroll", /*handle_scroll*/ ctx[8], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*$$scope, visible, hoverItemIndex*/ 16418) {
				each_value = /*visible*/ ctx[5];
				validate_each_argument(each_value);
				group_outros();
				validate_each_keys(ctx, each_value, get_each_context, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, svelte_virtual_list_contents, outro_and_destroy_block, create_each_block, null, get_each_context);
				check_outros();
			}

			if (!current || dirty & /*top*/ 64) {
				set_style(svelte_virtual_list_contents, "padding-top", /*top*/ ctx[6] + "px");
			}

			if (!current || dirty & /*bottom*/ 128) {
				set_style(svelte_virtual_list_contents, "padding-bottom", /*bottom*/ ctx[7] + "px");
			}

			if (!current || dirty & /*height*/ 1) {
				set_style(svelte_virtual_list_viewport, "height", /*height*/ ctx[0]);
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(svelte_virtual_list_viewport);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			/*svelte_virtual_list_contents_binding*/ ctx[16](null);
			/*svelte_virtual_list_viewport_binding*/ ctx[17](null);
			svelte_virtual_list_viewport_resize_listener();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("VirtualList", slots, ['default']);
	let { items = undefined } = $$props;
	let { height = "100%" } = $$props;
	let { itemHeight = 40 } = $$props;
	let { hoverItemIndex = 0 } = $$props;
	let { start = 0 } = $$props;
	let { end = 0 } = $$props;
	let height_map = [];
	let rows;
	let viewport;
	let contents;
	let viewport_height = 0;
	let visible;
	let mounted;
	let top = 0;
	let bottom = 0;
	let average_height;

	async function refresh(items, viewport_height, itemHeight) {
		const { scrollTop } = viewport;
		await tick();
		let content_height = top - scrollTop;
		let i = start;

		while (content_height < viewport_height && i < items.length) {
			let row = rows[i - start];

			if (!row) {
				$$invalidate(10, end = i + 1);
				await tick();
				row = rows[i - start];
			}

			const row_height = height_map[i] = itemHeight || row.offsetHeight;
			content_height += row_height;
			i += 1;
		}

		$$invalidate(10, end = i);
		const remaining = items.length - end;
		average_height = (top + content_height) / end;
		$$invalidate(7, bottom = remaining * average_height);
		height_map.length = items.length;
		if (viewport) $$invalidate(3, viewport.scrollTop = 0, viewport);
	}

	async function handle_scroll() {
		const { scrollTop } = viewport;
		const old_start = start;

		for (let v = 0; v < rows.length; v += 1) {
			height_map[start + v] = itemHeight || rows[v].offsetHeight;
		}

		let i = 0;
		let y = 0;

		while (i < items.length) {
			const row_height = height_map[i] || average_height;

			if (y + row_height > scrollTop) {
				$$invalidate(9, start = i);
				$$invalidate(6, top = y);
				break;
			}

			y += row_height;
			i += 1;
		}

		while (i < items.length) {
			y += height_map[i] || average_height;
			i += 1;
			if (y > scrollTop + viewport_height) break;
		}

		$$invalidate(10, end = i);
		const remaining = items.length - end;
		average_height = y / end;
		while (i < items.length) height_map[i++] = average_height;
		$$invalidate(7, bottom = remaining * average_height);

		if (start < old_start) {
			await tick();
			let expected_height = 0;
			let actual_height = 0;

			for (let i = start; i < old_start; i += 1) {
				if (rows[i - start]) {
					expected_height += height_map[i];
					actual_height += itemHeight || rows[i - start].offsetHeight;
				}
			}

			const d = actual_height - expected_height;
			viewport.scrollTo(0, scrollTop + d);
		}
	}

	onMount(() => {
		rows = contents.getElementsByTagName("svelte-virtual-list-row");
		$$invalidate(13, mounted = true);
	});

	const writable_props = ["items", "height", "itemHeight", "hoverItemIndex", "start", "end"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<VirtualList> was created with unknown prop '${key}'`);
	});

	function svelte_virtual_list_contents_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			contents = $$value;
			$$invalidate(4, contents);
		});
	}

	function svelte_virtual_list_viewport_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			viewport = $$value;
			$$invalidate(3, viewport);
		});
	}

	function svelte_virtual_list_viewport_elementresize_handler() {
		viewport_height = this.offsetHeight;
		$$invalidate(2, viewport_height);
	}

	$$self.$$set = $$props => {
		if ("items" in $$props) $$invalidate(11, items = $$props.items);
		if ("height" in $$props) $$invalidate(0, height = $$props.height);
		if ("itemHeight" in $$props) $$invalidate(12, itemHeight = $$props.itemHeight);
		if ("hoverItemIndex" in $$props) $$invalidate(1, hoverItemIndex = $$props.hoverItemIndex);
		if ("start" in $$props) $$invalidate(9, start = $$props.start);
		if ("end" in $$props) $$invalidate(10, end = $$props.end);
		if ("$$scope" in $$props) $$invalidate(14, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		onMount,
		tick,
		items,
		height,
		itemHeight,
		hoverItemIndex,
		start,
		end,
		height_map,
		rows,
		viewport,
		contents,
		viewport_height,
		visible,
		mounted,
		top,
		bottom,
		average_height,
		refresh,
		handle_scroll
	});

	$$self.$inject_state = $$props => {
		if ("items" in $$props) $$invalidate(11, items = $$props.items);
		if ("height" in $$props) $$invalidate(0, height = $$props.height);
		if ("itemHeight" in $$props) $$invalidate(12, itemHeight = $$props.itemHeight);
		if ("hoverItemIndex" in $$props) $$invalidate(1, hoverItemIndex = $$props.hoverItemIndex);
		if ("start" in $$props) $$invalidate(9, start = $$props.start);
		if ("end" in $$props) $$invalidate(10, end = $$props.end);
		if ("height_map" in $$props) height_map = $$props.height_map;
		if ("rows" in $$props) rows = $$props.rows;
		if ("viewport" in $$props) $$invalidate(3, viewport = $$props.viewport);
		if ("contents" in $$props) $$invalidate(4, contents = $$props.contents);
		if ("viewport_height" in $$props) $$invalidate(2, viewport_height = $$props.viewport_height);
		if ("visible" in $$props) $$invalidate(5, visible = $$props.visible);
		if ("mounted" in $$props) $$invalidate(13, mounted = $$props.mounted);
		if ("top" in $$props) $$invalidate(6, top = $$props.top);
		if ("bottom" in $$props) $$invalidate(7, bottom = $$props.bottom);
		if ("average_height" in $$props) average_height = $$props.average_height;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*items, start, end*/ 3584) {
			$$invalidate(5, visible = items.slice(start, end).map((data, i) => {
				return { index: i + start, data };
			}));
		}

		if ($$self.$$.dirty & /*mounted, items, viewport_height, itemHeight*/ 14340) {
			if (mounted) refresh(items, viewport_height, itemHeight);
		}
	};

	return [
		height,
		hoverItemIndex,
		viewport_height,
		viewport,
		contents,
		visible,
		top,
		bottom,
		handle_scroll,
		start,
		end,
		items,
		itemHeight,
		mounted,
		$$scope,
		slots,
		svelte_virtual_list_contents_binding,
		svelte_virtual_list_viewport_binding,
		svelte_virtual_list_viewport_elementresize_handler
	];
}

class VirtualList extends SvelteComponentDev {
	constructor(options) {
		super(options);
		if (!document.getElementById("svelte-g2cagw-style")) add_css();

		init(this, options, instance, create_fragment, safe_not_equal, {
			items: 11,
			height: 0,
			itemHeight: 12,
			hoverItemIndex: 1,
			start: 9,
			end: 10
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "VirtualList",
			options,
			id: create_fragment.name
		});
	}

	get items() {
		return this.$$.ctx[11];
	}

	set items(items) {
		this.$set({ items });
		flush();
	}

	get height() {
		return this.$$.ctx[0];
	}

	set height(height) {
		this.$set({ height });
		flush();
	}

	get itemHeight() {
		return this.$$.ctx[12];
	}

	set itemHeight(itemHeight) {
		this.$set({ itemHeight });
		flush();
	}

	get hoverItemIndex() {
		return this.$$.ctx[1];
	}

	set hoverItemIndex(hoverItemIndex) {
		this.$set({ hoverItemIndex });
		flush();
	}

	get start() {
		return this.$$.ctx[9];
	}

	set start(start) {
		this.$set({ start });
		flush();
	}

	get end() {
		return this.$$.ctx[10];
	}

	set end(end) {
		this.$set({ end });
		flush();
	}
}

var VirtualList$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': VirtualList
});

export default index;
